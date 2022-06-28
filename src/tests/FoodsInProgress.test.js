import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import {
  MEAL_INGREDIENTS, INITIAL_STATE_FOOD, MEAL_INSTRUCTIONS,
} from './mocks/foodReduxInitialState';
import * as localStr from '../services/mealsLocalSt';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import FoodRecipeInProgress from '../pages/FoodRecipeInProgress';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '52768' }),
  useRouteMatch: () => ({ path: '/foods/:id/in-progress', params: { id: '52768' } }),
}));

const initialEntries = ['/foods/52768/in-progress'];
const initialState = INITIAL_STATE_FOOD;

const setAllLocalStorageKeys = () => {
  localStorage.setItem('doneRecipes', JSON.stringify([]));
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify({ cocktails: {}, meals: {} }),
  );
};

describe('Test food in progress page renderization', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => localStorage.clear());

  it('Test if the application made a requisition to API', () => {
    const fetch = jest.spyOn(global, 'fetch');

    renderWithRouterRedux(
      <FoodRecipeInProgress />,
      { initialEntries },
    );

    expect(fetch).toBeCalled();
  });

  it('Test if it render all components on the screen ',
    async () => {
      global.fetch = jest.fn();

      renderWithRouterRedux(
        <FoodRecipeInProgress />,
        { initialState, initialEntries },
      );

      const coverImg = await screen.findByRole('img', { name: 'Recipe' });
      const recipeTitle = screen
        .getByRole('heading', { level: 2, name: 'Apple Frangipan Tart' });
      const shareBtn = screen.getByRole('img', { name: 'share icon' });
      const favoriteBtn = screen.getByRole('img', { name: 'favorite icon' });
      const ingredientsTitle = screen
        .getByRole('heading', { level: 3, name: 'Ingredients' });
      const instructionsTitle = screen
        .getByRole('heading', { level: 3, name: 'Instructions' });
      const instructionsText = screen.getByText(MEAL_INSTRUCTIONS);
      const finishBtn = screen.getByRole('button', { name: /Finish Recipe/i });

      expect(coverImg).toBeInTheDocument();
      expect(recipeTitle).toBeInTheDocument();
      expect(shareBtn).toBeInTheDocument();
      expect(favoriteBtn).toBeInTheDocument();
      expect(ingredientsTitle).toBeInTheDocument();
      MEAL_INGREDIENTS.forEach(([ingredient, measure]) => {
        if (measure) {
          expect(screen.getByText(`${ingredient} - ${measure}`)).toBeInTheDocument();
        } else {
          expect(screen.getByText(`${ingredient}`)).toBeInTheDocument();
        }
      });
      expect(instructionsTitle).toBeInTheDocument();
      expect(instructionsText).toBeInTheDocument();
      expect(finishBtn).toBeInTheDocument();
    });
});

describe('Check if share button funcionality of food in progress page', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => localStorage.clear());

  it('Test when click in share button the url is copied to clipboard',
    async () => {
      global.navigator = Object.assign(navigator, {
        clipboard: {
          writeText: (text) => text,
        },
      });

      const copy = jest.spyOn(global.navigator.clipboard, 'writeText');

      renderWithRouterRedux(
        <FoodRecipeInProgress />,
        { initialState, initialEntries },
      );

      userEvent.click(await screen.findByRole('img', { name: 'share icon' }));
      expect(copy).toBeCalled();
      expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();

      await waitForElementToBeRemoved(
        () => screen.getByText(/Link copied!/i),
        { timeout: 2000 },
      );
    });
});

describe('Check if favorite button funcionality of food in progress page', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => localStorage.clear());

  it('Test if click in favorite button the recipe is saved in local storage',
    async () => {
      const saveFavoriteRecipe = jest.spyOn(localStr, 'updateFavoriteRecipes');

      renderWithRouterRedux(
        <FoodRecipeInProgress />,
        { initialState, initialEntries },
      );

      const favoriteBtn = await screen.findByRole('img', { name: /favorite icon/i });
      expect(favoriteBtn.src).toBe(`http://localhost/${whiteHeartIcon}`);

      userEvent.click(favoriteBtn);

      expect(saveFavoriteRecipe).toBeCalled();
      expect(favoriteBtn.src).toBe(`http://localhost/${blackHeartIcon}`);
    });

  it('Test after click in favorite button and page loading the button remains checked',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '52768',
        type: 'food',
        nationality: 'British',
        category: 'Dessert',
        alcoholicOrNot: '',
        name: 'Apple Frangipan Tart',
        image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
      }]));

      renderWithRouterRedux(
        <FoodRecipeInProgress />,
        { initialState, initialEntries },
      );

      const favoriteBtn = await screen.findByRole('img', { name: /favorite icon/i });

      expect(favoriteBtn.src).toBe(`http://localhost/${blackHeartIcon}`);
    });
});

describe('Test finish button funcionality of food in progress page',
  () => {
    beforeEach(() => setAllLocalStorageKeys());

    afterEach(() => localStorage.clear());

    it('Test until all ingredients get marked the button stay disable',
      async () => {
        renderWithRouterRedux(
          <FoodRecipeInProgress />,
          { initialState, initialEntries },
        );

        const finishBtn = await screen.findByRole('button', { name: /Finish Recipe/i });

        expect(finishBtn).toBeDisabled();
      });

    it('Test if all ingredients get marked enable button',
      async () => {
        renderWithRouterRedux(
          <FoodRecipeInProgress />,
          { initialState, initialEntries },
        );

        const listItems = await screen.findAllByRole('checkbox');
        listItems.forEach((element) => userEvent.click(element));
        listItems.forEach((element) => expect(element).toBeChecked());

        const finishBtn = screen.getByRole('button', { name: /Finish Recipe/i });
        expect(finishBtn).not.toBeDisabled();
      });

    it('Test when finish the recipe redirect to done recipe page',
      async () => {
        const { history } = renderWithRouterRedux(
          <FoodRecipeInProgress />,
          { initialState, initialEntries },
        );

        const listItems = await screen.findAllByRole('checkbox');
        listItems.forEach((element) => userEvent.click(element));

        userEvent.click(screen.getByRole('button', { name: /Finish Recipe/i }));

        expect(history.location.pathname).toBe('/done-recipes');
      });
  });
