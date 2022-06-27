import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import ingredients from './mocks/ingredientsMeal';
import initialState from './mocks/ingredientsInitialState';

const PATH = '/explore/foods/ingredients';
const { ingredientsResults: { meals } } = initialState;
const setMock = () => beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(ingredients),
    }));
});

describe('1 - Explore Foods Ingredients page, testing components render', () => {
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

  it('checks if by Ingredients buttons are rendered',
    () => {
      const INGREDIENTS_BUTTONS = 12;
      renderWithRouterRedux(<App />, { initialEntries: [PATH], initialState });
      expect(global.fetch).toHaveBeenCalledTimes(1);

      const images = screen.getAllByRole('img');
      const ingredientsBtns = images.filter((img) => !img.alt.includes('icon'));
      expect(ingredientsBtns).toHaveLength(INGREDIENTS_BUTTONS);
      ingredientsBtns.forEach((ingredient, index) => {
        expect(ingredient.alt).toBe(meals[index].strIngredient);
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
