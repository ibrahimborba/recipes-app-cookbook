import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import { DRINK_INGREDIENTS, INITIAL_STATE_DRINK,
  DRINK_INSTRUCTIONS,
} from './mocks/drinkReduxInitialState';
import * as localStr from '../services/mealsLocalSt';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import App from '../App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '15997' }),
  useRouteMatch: () => ({ path: '/drinks/:id/in-progress', params: { id: '15997' } }),
}));

const initialEntries = ['/drinks/15997/in-progress'];
const initialState = INITIAL_STATE_DRINK;
const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

const setAllLocalStorageKeys = () => {
  localStorage.setItem('doneRecipes', JSON.stringify([]));
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify({ cocktails: {}, meals: {} }),
  );
};

describe('Test drink in progress page renderization', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => localStorage.clear());

  it('Test if the application made a requisition to API', () => {
    const fetch = jest.spyOn(global, 'fetch');

    renderWithRouterRedux(
      <App />,
      { initialEntries },
    );

    expect(fetch).toBeCalled();
  });

  it('Test if it render all components on the screen ', async () => {
    global.fetch = jest.fn();

    renderWithRouterRedux(
      <App />,
      { initialState, initialEntries },
    );

    const [recipeIngredient] = DRINK_INGREDIENTS;
    const [ingredient, measure] = recipeIngredient;

    const coverImg = await screen.findByRole('img', { name: 'Recipe' });
    const recipeTitle = screen
      .getByRole('heading', { level: 2, name: 'GG' });
    const shareBtn = screen.getByRole('img', { name: 'share icon' });
    const favoriteBtn = screen.getByRole('img', { name: 'favorite icon' });
    const ingredientsTitle = screen
      .getByRole('heading', { level: 3, name: 'Ingredients' });
    const instructionsTitle = screen
      .getByRole('heading', { level: 3, name: 'Instructions' });
    const ingredientsText = screen.getByText(`- ${ingredient} - ${measure}`);
    const instructionsText = screen.getByText(DRINK_INSTRUCTIONS[0]);
    const finishBtn = screen.getByRole('button', { name: /Finish Recipe/i });

    expect(coverImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(ingredientsTitle).toBeInTheDocument();
    expect(ingredientsText).toBeInTheDocument();
    expect(instructionsTitle).toBeInTheDocument();
    expect(instructionsText).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();
  });
});

describe('Check if share button funcionality of drink in progress page', () => {
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

describe('Check if favorite button funcionality of drink in progress page', () => {
  beforeEach(() => setAllLocalStorageKeys());

  afterEach(() => localStorage.clear());

  it('Test if click in favorite button the recipe is saved in local storage',
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
        { initialState, initialEntries },
      );

      const favoriteBtn = await screen.findByRole('img', { name: /favorite icon/i });

      expect(favoriteBtn.src).toBe(`http://localhost/${blackHeartIcon}`);
    });
});

describe('Test finish button funcionality of drink in progress page',
  () => {
    beforeEach(() => setAllLocalStorageKeys());

    afterEach(() => localStorage.clear());

    it('Test until all ingredients get marked the button stay disable',
      async () => {
        renderWithRouterRedux(
          <App />,
          { initialState, initialEntries },
        );

        const finishBtn = await screen.findByRole('button', { name: /Finish Recipe/i });

        expect(finishBtn).toBeDisabled();
      });

    it('Test if all ingredients get marked enable button',
      async () => {
        renderWithRouterRedux(
          <App />,
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
          <App />,
          { initialState, initialEntries },
        );

        const listItems = await screen.findAllByRole('checkbox');
        listItems.forEach((element) => userEvent.click(element));

        userEvent.click(screen.getByRole('button', { name: /Finish Recipe/i }));

        expect(history.location.pathname).toBe('/done-recipes');
      });
  });
