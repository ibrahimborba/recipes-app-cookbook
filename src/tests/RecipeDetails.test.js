import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import App from '../App';
import {
  MEAL_INGREDIENTS, INITIAL_STATE_FOOD, MEAL_INSTRUCTIONS,
  DRINK_RECOMMENDATIONS, VIDEO_URL_EMBED,
} from './mocks/foodReduxInitialState';
import {
  DRINK_INGREDIENTS, INITIAL_STATE_DRINK,
  DRINK_INSTRUCTIONS, FOOD_RECOMMENDATIONS,
} from './mocks/drinkReduxInitialState';

describe('Test food detail page renderization', () => {
  const initialState = INITIAL_STATE_FOOD;

  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }),
    );
  });

  afterEach(() => localStorage.clear());

  it('Test if the application made a requisition to API', () => {
    const fetch = jest.spyOn(global, 'fetch');

    renderWithRouterRedux(
      <App />,
      {
        initialEntries: ['/foods/52768'],
      },
    );

    expect(fetch).toBeCalled();
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52768');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });

  it('Test if it render all components on the screen ', async () => {
    global.fetch = jest.fn();

    renderWithRouterRedux(
      <App />,
      {
        initialState,
        initialEntries: ['/foods/52768'],
      },
    );

    await waitForElementToBeRemoved(
      () => screen.getByText(/Loading/i),
      { timeout: 3000 },
    );

    const coverImg = screen.getByRole('img', { name: 'Recipe' });
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
      expect(screen.getByRole('heading', { level: 4, name: title })).toBeInTheDocument();
    });
    expect(startBtn).toBeInTheDocument();
  });
});

describe('Test drink detail page renderization', () => {
  const initialState = INITIAL_STATE_DRINK;

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }),
    );
  });

  afterEach(() => localStorage.clear());

  it('Test if the application made a requisition to API', () => {
    const fetch = jest.spyOn(global, 'fetch');

    renderWithRouterRedux(
      <App />,
      {
        initialEntries: ['/drinks/15997'],
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
        initialEntries: ['/drinks/15997'],
        initialState,
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
      if (measure) {
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
