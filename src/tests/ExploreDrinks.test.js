import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import randomResult from './mocks/randomDrink';
import categories from './mocks/categoriesDrink';

const PATH = '/explore/drinks';

describe('1 - Explore Drinks page, testing components render', () => {
  it('checks if Header is rendered with Profile image and page Title',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const pageTitle = screen.getByRole('heading', { name: 'Explore Drinks', level: 1 });
      const profileImg = screen.getByRole('img', { name: 'profile icon' });
      expect(pageTitle).toBeInTheDocument();
      expect(profileImg).toBeInTheDocument();
    });

  it('checks if by Ingredient and Surprise buttons are rendered',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const byIngredientBtn = screen.getByText('By Ingredient');
      const surpriseBtn = screen.getByText('Surprise me!');
      expect(byIngredientBtn).toBeInTheDocument();
      expect(surpriseBtn).toBeInTheDocument();
    });

  it('checks if Footer is rendered with Drink, Explore and Meal icons',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const drinksBtnFooter = screen.getByRole('button', { name: 'drink-icon' });
      const exploreBtnFooter = screen.getByRole('button', { name: 'explore-icon' });
      const mealBtnFooter = screen.getByRole('button', { name: 'meal-icon' });
      expect(drinksBtnFooter).toBeInTheDocument();
      expect(exploreBtnFooter).toBeInTheDocument();
      expect(mealBtnFooter).toBeInTheDocument();
    });
});

describe('2 - Explore Foods page, testing buttons redirect to expected paths', () => {
  afterEach(() => jest.restoreAllMocks());

  it('checks if Header Profile image redirects to "/profile" on click',
    () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const profileImg = screen.getByRole('img', { name: 'profile icon' });
      userEvent.click(profileImg);
      expect(history.location.pathname).toBe('/profile');
    });

  it('checks if By Ingredient button redirects to "/explore/drinks/ingredients" on click',
    () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const byIngredientBtn = screen.getByText('By Ingredient');
      userEvent.click(byIngredientBtn);
      expect(history.location.pathname).toBe('/explore/drinks/ingredients');
    });

  it('checks if Surprise me! button fetch a random recipe on click',
    () => {
      jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
          json: () => Promise.resolve(randomResult),
        }));

      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const surpriseBtn = screen.getByText('Surprise me!');
      userEvent.click(surpriseBtn);

      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    });

  it('checks if when Drink, Explore and Food icons redirect to expected paths on click',
    () => {
      jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
          json: () => Promise.resolve(categories),
        }));

      const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });

      const drinksBtnFooter = screen.getByRole('button', { name: 'drink-icon' });
      userEvent.click(drinksBtnFooter);
      expect(history.location.pathname).toBe('/drinks');

      const exploreBtnFooter = screen.getByRole('button', { name: 'explore-icon' });
      userEvent.click(exploreBtnFooter);
      expect(history.location.pathname).toBe('/explore');

      const mealBtnFooter = screen.getByRole('button', { name: 'meal-icon' });
      userEvent.click(mealBtnFooter);
      expect(history.location.pathname).toBe('/foods');
    });
});
