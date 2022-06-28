import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import DrinkRecipe from '../pages/DrinkRecipe';
import {
  DRINK_INGREDIENTS, INITIAL_STATE_DRINK,
  DRINK_INSTRUCTIONS, FOOD_RECOMMENDATIONS,
} from './mocks/drinkReduxInitialState';
import * as localStr from '../services/mealsLocalSt';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '15997' }),
  useRouteMatch: () => ({ path: '/drinks/:id', params: { id: '15997' } }),
}));

const initialEntries = ['/drinks/15997'];
const initialState = INITIAL_STATE_DRINK;

const setAllLocalStorageKeys = () => {
  localStorage.setItem('doneRecipes', JSON.stringify([]));
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify({ cocktails: {}, meals: {} }),
  );
};

describe('Test drink detail page renderization', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => localStorage.clear());

  it('Test if the application made a requisition to API', () => {
    const fetch = jest.spyOn(global, 'fetch');

    renderWithRouterRedux(
      <DrinkRecipe />,
      { initialEntries },
    );

    expect(fetch).toBeCalled();
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  it('Test if it render all components on the screen ', async () => {
    global.fetch = jest.fn();

    renderWithRouterRedux(
      <DrinkRecipe />,
      { initialState, initialEntries },
    );

    const coverImg = await screen.findByRole('img', { name: 'Recipe' });
    const recipeTitle = screen
      .getByRole('heading', { level: 2, name: 'GG' });
    const shareBtn = screen.getByRole('img', { name: 'share icon' });
    const favoriteBtn = screen.getByRole('img', { name: 'favorite icon' });
    const ingredientsTitle = screen
      .getByRole('heading', { level: 3, name: 'Ingredients' });
    const instructionsTitle = screen
      .getByRole('heading', { level: 3, name: 'Instructions' });
    const instructionsText = screen.getByText(DRINK_INSTRUCTIONS);
    const startBtn = screen.getByRole('button', { name: /Start Recipe/i });

    expect(coverImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(ingredientsTitle).toBeInTheDocument();
    DRINK_INGREDIENTS.forEach(([ingredient, measure]) => {
      if (measure !== null) {
        expect(screen.getByText(`${ingredient} - ${measure}`)).toBeInTheDocument();
      } else {
        expect(screen.getByText(`${ingredient}`)).toBeInTheDocument();
      }
    });
    expect(instructionsTitle).toBeInTheDocument();
    expect(instructionsText).toBeInTheDocument();
    FOOD_RECOMMENDATIONS.forEach(({ image, title }) => {
      expect(screen.getByRole('img', { name: title }).src).toBe(image);
      expect(screen.getByRole('img', { name: title })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4, name: title })).toBeInTheDocument();
    });
    expect(startBtn).toBeInTheDocument();
  });
});

describe('Check share button funcionality of drink details page', () => {
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
        <DrinkRecipe />,
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

describe('Check favorite button funcionality of drink details page', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => localStorage.clear());

  it('Test if click in favorite button the recipe is saved in local storage',
    async () => {
      const saveFavoriteRecipe = jest.spyOn(localStr, 'updateFavoriteRecipes');

      renderWithRouterRedux(
        <DrinkRecipe />,
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
        id: '15997',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Optional alcohol',
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      }]));

      renderWithRouterRedux(
        <DrinkRecipe />,
        { initialState, initialEntries },
      );

      const favoriteBtn = await screen.findByRole('img', { name: /favorite icon/i });

      expect(favoriteBtn.src).toBe(`http://localhost/${blackHeartIcon}`);
    });
});

describe('Test start button funcionality of drink details page',
  () => {
    beforeEach(() => setAllLocalStorageKeys());

    afterEach(() => localStorage.clear());

    it('Test if click in start button go to in progress page',
      async () => {
        const { history } = renderWithRouterRedux(
          <DrinkRecipe />,
          { initialState, initialEntries },
        );

        userEvent.click(await screen.findByRole('button', { name: /Start Recipe/i }));

        expect(history.location.pathname).toBe('/drinks/15997/in-progress');
      });

    it('Test if the recipe is already in progress if the button text change',
      async () => {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({ cocktails: { 15997: [] }, meals: {} }),
        );

        renderWithRouterRedux(
          <DrinkRecipe />,
          { initialState, initialEntries },
        );

        const startBtn = await screen.findByRole('button', { name: /Continue Recipe/i });
        expect(startBtn).toBeInTheDocument();
      });

    it('Test if the recipe is in progress the button redirect to in progress page',
      async () => {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({ cocktails: { 15997: [] }, meals: {} }),
        );

        const { history } = renderWithRouterRedux(
          <DrinkRecipe />,
          { initialState, initialEntries },
        );

        const startBtn = await screen.findByRole('button', { name: /Continue Recipe/i });

        userEvent.click(startBtn);

        expect(history.location.pathname).toBe('/drinks/15997/in-progress');
      });

    it('Test if the recipe is already done button disapear',
      async () => {
        localStorage.setItem('doneRecipes', JSON.stringify([{
          id: '15997',
          type: 'drink',
          nationality: '',
          category: 'Ordinary Drink',
          alcoholicOrNot: 'Optional alcohol',
          name: 'GG',
          image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
          doneDate: '1/5/2022',
          tags: [],
        }]));

        renderWithRouterRedux(
          <DrinkRecipe />,
          { initialState, initialEntries },
        );

        const buttons = await screen.findAllByRole('button');
        expect(buttons.some((element) => element.innerText === 'Start recipe'))
          .not.toBeTruthy();
      });
  });
