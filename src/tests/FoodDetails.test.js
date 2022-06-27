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
import FoodRecipe from '../pages/FoodRecipe';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '52768' }),
  useRouteMatch: () => ({ path: '/foods/:id', params: { id: '52768' } }),
}));

const FOOD_DETAILS_URL = '/foods/52768';

const setAllLocalStorageKeys = () => {
  localStorage.setItem('doneRecipes', JSON.stringify([]));
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify({ cocktails: {}, meals: {} }),
  );
};

describe('Test food detail page renderization', () => {
  const initialState = INITIAL_STATE_FOOD;

  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => localStorage.clear());

  it('Test if the application made a requisition to API', () => {
    const fetch = jest.spyOn(global, 'fetch');

    renderWithRouterRedux(
      <FoodRecipe />,
      {
        initialEntries: [FOOD_DETAILS_URL],
      },
    );

    expect(fetch).toBeCalled();
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52768');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  it('Test if it render all components on the screen ',
    async () => {
      global.fetch = jest.fn();

      renderWithRouterRedux(
        <FoodRecipe />,
        {
          initialState,
          initialEntries: [FOOD_DETAILS_URL],
        },
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
      const video = screen.getByTitle('YouTube video player');
      const startBtn = screen.getByRole('button', { name: /Start Recipe/i });

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

describe('Check if share button funcionality of food details page', () => {
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
        <FoodRecipe />,
        {
          initialState: INITIAL_STATE_FOOD,
          initialEntries: [FOOD_DETAILS_URL],
        },
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

describe('Check if favorite button funcionality of food details page', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => localStorage.clear());

  it('Test if click in favorite button the recipe is saved on local storage',
    async () => {
      const saveFavoriteRecipe = jest.spyOn(localStr, 'updateFavoriteRecipes');

      renderWithRouterRedux(
        <FoodRecipe />,
        {
          initialState: INITIAL_STATE_FOOD,
          initialEntries: [FOOD_DETAILS_URL],
        },
      );

      const favoriteBtn = await screen.findByRole('img', { name: /favorite icon/i });
      expect(favoriteBtn.src).toBe(`http://localhost/${whiteHeartIcon}`);

      userEvent.click(favoriteBtn);

      expect(saveFavoriteRecipe).toBeCalled();
      expect(favoriteBtn.src).toBe(`http://localhost/${blackHeartIcon}`);
    });

  it('Test after check favorite btn if page reaload the favorite button keeps check',
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
        <FoodRecipe />,
        {
          initialState: INITIAL_STATE_FOOD,
          initialEntries: [FOOD_DETAILS_URL],
        },
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
          <FoodRecipe />,
          {
            initialState: INITIAL_STATE_FOOD,
            initialEntries: [FOOD_DETAILS_URL],
          },
        );

        userEvent.click(await screen.findByRole('button', { name: /Start Recipe/i }));

        expect(history.location.pathname).toBe('/foods/52768/in-progress');
      });

    it('Test if the recipe is already in progress if the button text changes',
      async () => {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({ cocktails: {}, meals: { 52768: [] } }),
        );

        renderWithRouterRedux(
          <FoodRecipe />,
          {
            initialState: INITIAL_STATE_FOOD,
            initialEntries: [FOOD_DETAILS_URL],
          },
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
          <FoodRecipe />,
          {
            initialState: INITIAL_STATE_FOOD,
            initialEntries: [FOOD_DETAILS_URL],
          },
        );

        const startBtn = await screen.findByRole('button', { name: /Continue Recipe/i });

        userEvent.click(startBtn);

        expect(history.location.pathname).toBe('/foods/52768/in-progress');
      });
  });
