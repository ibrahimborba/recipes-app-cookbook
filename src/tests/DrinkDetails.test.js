import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import App from '../App';
import {
  DRINK_INGREDIENTS, INITIAL_STATE_DRINK,
  DRINK_INSTRUCTIONS, FOOD_RECOMMENDATIONS,
} from './mocks/drinkReduxInitialState';
import * as localStr from '../services/mealsLocalSt';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const DRINK_DETAILS_URL = '/drinks/15997';

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
      <App />,
      {
        initialEntries: [DRINK_DETAILS_URL],
      },
    );

    expect(fetch).toBeCalled();
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  it('Test if it render all components on the screen ', async () => {
    global.fetch = jest.fn();

    renderWithRouterRedux(
      <App />,
      {
        initialState: INITIAL_STATE_DRINK,
        initialEntries: [DRINK_DETAILS_URL],
      },
    );

    await waitForElementToBeRemoved(
      () => screen.getByText(/Loading/i),
      { timeout: 3000 },
    );

    const coverImg = screen.getByRole('img', { name: 'Recipe' });
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

describe('Check if share button funcionality of drink details page', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => {
    localStorage.clear();
  });

  it('Test when click in share button the url is copied to clipboard',
    async () => {
      global.navigator = Object.assign(navigator, {
        clipboard: {
          writeText: (text) => text,
        },
      });

      const copy = jest.spyOn(global.navigator.clipboard, 'writeText');

      renderWithRouterRedux(
        <App />,
        {
          initialState: INITIAL_STATE_DRINK,
          initialEntries: [DRINK_DETAILS_URL],
        },
      );

      await waitForElementToBeRemoved(
        () => screen.getByText(/Loading/i),
        { timeout: 3000 },
      );

      userEvent.click(screen.getByRole('img', { name: 'share icon' }));
      expect(copy).toBeCalled();
      expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();

      await waitForElementToBeRemoved(
        () => screen.getByText(/Link copied!/i),
        { timeout: 2000 },
      );
    });
});

describe('Check if favorite button funcionality of drink details page', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => {
    localStorage.clear();
  });

  it('Test if click in favorite button the recipe is saved on local storage',
    async () => {
      const saveFavoriteRecipe = jest.spyOn(localStr, 'updateFavoriteRecipes');

      renderWithRouterRedux(
        <App />,
        {
          initialState: INITIAL_STATE_DRINK,
          initialEntries: [DRINK_DETAILS_URL],
        },
      );

      await waitForElementToBeRemoved(
        () => screen.getByText(/Loading/i),
        { timeout: 3000 },
      );

      const favoriteBtn = screen.getByRole('img', { name: /favorite icon/i });
      expect(favoriteBtn.src).toBe(`http://localhost/${whiteHeartIcon}`);

      userEvent.click(favoriteBtn);

      expect(saveFavoriteRecipe).toBeCalled();
      expect(favoriteBtn.src).toBe(`http://localhost/${blackHeartIcon}`);
    });

  it('Test after check favorite btn if page reaload the favorite button keeps check',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: '15997',
          type: 'drink',
          nationality: '',
          category: 'Ordinary Drink',
          alcoholicOrNot: 'Optional alcohol',
          name: 'GG',
          image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        },
      ]));

      renderWithRouterRedux(
        <App />,
        {
          initialState: INITIAL_STATE_DRINK,
          initialEntries: [DRINK_DETAILS_URL],
        },
      );

      await waitForElementToBeRemoved(
        () => screen.getByText(/Loading/i),
        { timeout: 3000 },
      );

      expect(screen.getByRole('img', { name: /favorite icon/i }).src).toBe(`http://localhost/${blackHeartIcon}`);
    });
});
