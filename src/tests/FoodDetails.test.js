import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import {
  MEAL_INGREDIENTS, INITIAL_STATE_FOOD, MEAL_INSTRUCTIONS,
  DRINK_RECOMMENDATIONS, VIDEO_URL_EMBED,
} from './mocks/foodReduxInitialState';
import * as localStr from '../services/mealsLocalSt';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import App from '../App';

const copy = require('clipboard-copy');

jest.mock('clipboard-copy');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '52768' }),
  useRouteMatch: () => ({ path: '/foods/:id', params: { id: '52768' } }),
}));

const initialEntries = ['/foods/52768'];
const initialState = INITIAL_STATE_FOOD;
const FOOD_NAME = 'Apple Frangipan Tart';

const setAllLocalStorageKeys = () => {
  localStorage.setItem('doneRecipes', JSON.stringify([]));
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify({ cocktails: {}, meals: {} }),
  );
};

describe('Test food detail page renderization', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => localStorage.clear());

  it('Test if the application made a requisition to API', () => {
    const fetch = jest.spyOn(global, 'fetch');

    renderWithRouterRedux(
      <App />,
      { initialEntries },
    );

    expect(fetch).toBeCalled();
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52768');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  it('Test if it render all components on the screen ',
    async () => {
      global.fetch = jest.fn();

      renderWithRouterRedux(
        <App />,
        { initialState, initialEntries },
      );

      const [recipeIngredient] = MEAL_INGREDIENTS;
      const [ingredient, measure] = recipeIngredient;

      const coverImg = await screen.findByRole('img', { name: 'Recipe' });
      const recipeTitle = screen
        .getByRole('heading', { level: 2, name: FOOD_NAME });
      const shareBtn = screen.getByRole('img', { name: 'share icon' });
      const favoriteBtn = screen.getByRole('img', { name: 'favorite icon' });
      const ingredientsTitle = screen
        .getByRole('heading', { level: 3, name: 'Ingredients' });
      const instructionsTitle = screen
        .getByRole('heading', { level: 3, name: 'Instructions' });
      const ingredientsText = screen.getByText(`- ${ingredient} - ${measure}`);
      const instructionsText = screen.getByText(MEAL_INSTRUCTIONS[0]);
      const video = screen.getByTitle('YouTube video player');
      const startBtn = screen.getByRole('button', { name: /Start Recipe/i });

      expect(coverImg).toBeInTheDocument();
      expect(recipeTitle).toBeInTheDocument();
      expect(shareBtn).toBeInTheDocument();
      expect(favoriteBtn).toBeInTheDocument();
      expect(ingredientsTitle).toBeInTheDocument();
      expect(ingredientsText).toBeInTheDocument();
      expect(instructionsTitle).toBeInTheDocument();
      expect(instructionsText).toBeInTheDocument();
      expect(video).toBeInTheDocument();
      expect(video.src).toBe(VIDEO_URL_EMBED);
      DRINK_RECOMMENDATIONS.forEach(({ image, title }) => {
        expect(screen.getByRole('img', { name: title })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: title }).src).toBe(image);
        expect(screen.getByRole('heading', { level: 4, name: title }))
          .toBeInTheDocument();
      });
      expect(startBtn).toBeInTheDocument();
    });
});

describe('Check share button funcionality of food details page', () => {
  beforeEach(() => setAllLocalStorageKeys());
  afterEach(() => localStorage.clear());

  it('Test when click in share button the url is copied to clipboard',
    async () => {
      renderWithRouterRedux(
        <App />,
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

describe('Check favorite button funcionality of food details page', () => {
  beforeEach(() => setAllLocalStorageKeys());
  afterEach(() => localStorage.clear());

  it('Test if click in favorite button the recipe is saved on local storage',
    async () => {
      const saveFavoriteRecipe = jest.spyOn(localStr, 'updateFavoriteRecipes');

      renderWithRouterRedux(
        <App />,
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
        name: FOOD_NAME,
        image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
      }]));

      renderWithRouterRedux(
        <App />,
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
          <App />,
          { initialState, initialEntries },
        );

        userEvent.click(await screen.findByRole('button', { name: /Start Recipe/i }));

        expect(history.location.pathname).toBe('/foods/52768/in-progress');
      });

    it('Test if the recipe is already in progress if the button text change',
      async () => {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({ cocktails: {}, meals: { 52768: [] } }),
        );

        renderWithRouterRedux(
          <App />,
          { initialState, initialEntries },
        );

        const startBtn = await screen.findByRole('button', { name: /Continue Recipe/i });
        expect(startBtn).toBeInTheDocument();
      });

    it('Test if the recipe is in progress the button redirect to in progress page',
      async () => {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({ cocktails: {}, meals: { 52768: [] } }),
        );

        const { history } = renderWithRouterRedux(
          <App />,
          { initialState, initialEntries },
        );

        const startBtn = await screen.findByRole('button', { name: /Continue Recipe/i });

        userEvent.click(startBtn);

        expect(history.location.pathname).toBe('/foods/52768/in-progress');
      });

    it('Test if the recipe is already done button disapear',
      async () => {
        localStorage.setItem('doneRecipes', JSON.stringify([{
          id: '52768',
          type: 'food',
          nationality: 'British',
          category: 'Dessert',
          alcoholicOrNot: '',
          name: FOOD_NAME,
          image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
          doneDate: '1/5/2022',
          tags: ['Tart', 'Baking', 'Fruity'],
        }]));

        renderWithRouterRedux(
          <App />,
          { initialState, initialEntries },
        );

        const buttons = await screen.findAllByRole('button');
        expect(buttons.some((element) => element.innerText === 'Start recipe'))
          .not.toBeTruthy();
      });
  });
