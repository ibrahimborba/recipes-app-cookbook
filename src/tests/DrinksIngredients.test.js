import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import ingredients from './mocks/ingredientsDrink';
import initialState from './mocks/ingredientsInitialState';

const PATH = '/explore/drinks/ingredients';
const { ingredientsResults: { drinks } } = initialState;
const setMock = () => beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(ingredients),
    }));
});

describe('1 - Drinks Ingredients page, testing components render', () => {
  setMock();
  afterEach(() => jest.restoreAllMocks());

  it('checks if Header is rendered with Profile image and page Title',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const pageTitle = screen.getByRole('heading',
        { name: 'Explore Ingredients', level: 1 });
      const profileImg = screen.getByRole('img', { name: 'profile icon' });
      expect(pageTitle).toBeInTheDocument();
      expect(profileImg).toBeInTheDocument();
    });

  it('checks if Ingredients buttons are rendered',
    () => {
      const INGREDIENTS_BUTTONS = 12;
      renderWithRouterRedux(<App />, { initialEntries: [PATH], initialState });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');

      const images = screen.getAllByRole('img');
      const ingredientsBtns = images.filter((img) => !img.alt.includes('icon'));
      expect(ingredientsBtns).toHaveLength(INGREDIENTS_BUTTONS);
      ingredientsBtns.forEach((ingredient, index) => {
        expect(ingredient.alt).toBe(drinks[index].strIngredient1);
      });
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
