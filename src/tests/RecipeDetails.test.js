import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import App from '../App';
import {
  INGREDIENTS, INITIAL_STATE, INSTRUCTIONS, RECOMMENDATIONS, VIDEO_URL_EMBED,
} from './mocks/recipeInitialState';

describe('Test food detail page renderization', () => {
  const initialState = INITIAL_STATE;

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
    const instructionsText = screen.getByText(INSTRUCTIONS);
    const video = screen.getByTitle('YouTube video player');
    const startBtn = screen.getByRole('button', { name: /Start Recipe/i });

    expect(coverImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(ingredientsTitle).toBeInTheDocument();
    INGREDIENTS.forEach(([ingredient, measure]) => {
      expect(screen.getByText(`${ingredient} - ${measure}`)).toBeInTheDocument();
    });
    expect(instructionsTitle).toBeInTheDocument();
    expect(instructionsText).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(video.src).toBe(VIDEO_URL_EMBED);
    RECOMMENDATIONS.forEach(({ image, title }) => {
      expect(screen.getByRole('img', { name: title })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: title }).src).toBe(image);
      expect(screen.getByRole('heading', { level: 4, name: title })).toBeInTheDocument();
    });
    expect(startBtn).toBeInTheDocument();
  });
});
