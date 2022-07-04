import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import Favorites from '../pages/Favorites';

const PATH = '/favorite-recipes';
const horizontalTestId = '0-horizontal-top-text';
const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

const setFavLocalStorageKey = () => {
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify([
      {
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ]),
  );
};

describe('1 - Favorites page inputs tests', () => {
  it('checks if favoriteRecipes page buttons are rendered as expected', () => {
    const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });
    expect(history.location.pathname).toBe('/favorite-recipes');

    const allBtn = screen.getByText(/All/i);
    const foodBtn = screen.getByText(/Food/i);
    const drinksBtn = screen.getByText(/Drinks/i);

    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });
});

describe('2 - Favorites page foods and drinks card renderization', () => {
  beforeEach(() => setFavLocalStorageKey());
  afterEach(() => localStorage.clear());

  it('checks if done foods and drinks cards are rendered as expected', () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    const allBtn = screen.getByText(/All/i);
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);

    const foodImg = screen.getByRole('img', { name: '52771' });
    const foodInfos = screen.getByTestId(horizontalTestId);

    const drinkImg = screen.getByRole('img', { name: 'Aquamarine' });
    const drinkInfos = screen.getByTestId('1-horizontal-top-text');

    expect(foodImg).toBeInTheDocument();
    expect(foodImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(foodInfos).toHaveTextContent(/Italian - Vegetarian/i);

    expect(drinkImg).toBeInTheDocument();
    expect(drinkInfos).toHaveTextContent(/Alcoholic/i);
  });

  it('checks if food button works as expected', async () => {
    renderWithRouterRedux(<App />, { initialEntries: [PATH] });

    const drinksBtn = screen.getByText('Drinks');
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);

    await waitForElementToBeRemoved(
      () => screen.queryByRole('img', { name: '52771' }),
      { timeout: 1500 },
    );

    const drinkImg = screen.getByRole('img', { name: 'Aquamarine' });
    const drinkInfos = screen.getByTestId(horizontalTestId);

    expect(drinkImg).toBeInTheDocument();
    expect(drinkInfos).toHaveTextContent(/Alcoholic/i);
  });

  it('checks if clipboard works as expected', async () => {
    renderWithRouterRedux(
      <App />,
      {
        initialEntries: [PATH],
      },
    );

    userEvent.click(screen.getByRole('img', { name: 'Spicy Arrabiata Penne' }));
    expect(copy).toBeCalled();
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(
      () => screen.getByText(/Link copied!/i),
      { timeout: 1500 },
    );
  });

  it('checks if remove favorite button works as expected', async () => {
    renderWithRouterRedux(<Favorites />, { initialEntries: [PATH] });

    const foodImg = screen.getByRole('img', { name: '52771' });
    const foodInfos = screen.getByTestId(horizontalTestId);

    const drinkImg = screen.getByRole('img', { name: 'Aquamarine' });
    const drinkInfos = screen.getByTestId('1-horizontal-top-text');

    expect(foodImg).toBeInTheDocument();
    expect(foodImg).toBeInTheDocument();
    expect(foodInfos).toHaveTextContent(/Italian - Vegetarian/i);

    expect(drinkImg).toBeInTheDocument();
    expect(drinkInfos).toHaveTextContent(/Alcoholic/i);

    const removefavoriteBtn = screen.getAllByRole('img', { name: 'favorite icon' });

    userEvent.click(removefavoriteBtn[1]);

    await waitForElementToBeRemoved(
      () => screen.getByText(/Aquamarine/i),
      { timeout: 1500 },
    );
  });
});
