import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import DrinksIngredients from '../pages/DrinksIngredients';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import ingredients from './mocks/ingredientsDrink';
import initialState from './mocks/ingredientsInitialState';
import categories from './mocks/categoriesDrink';

const PATH = '/explore/drinks/ingredients';
const { ingredientsResults: { drinks } } = initialState;
const setMock = () => beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(ingredients),
    }));
});

describe('1 - DrinksIngredients page, testing components render', () => {
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
    async () => {
      const INGREDIENTS_BUTTONS = 12;
      renderWithRouterRedux(<App />, { initialEntries: [PATH], initialState });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');

      await waitForElementToBeRemoved(() => screen.getByTestId('loading'));

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

describe('2 - DrinksIngredients page, testing buttons redirect to expected paths', () => {
  setMock();
  afterEach(() => jest.restoreAllMocks());

  it('checks if Header Profile image redirects to "/profile" on click',
    async () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const profileImg = screen.getByRole('img', { name: 'profile icon' });
      userEvent.click(profileImg);
      expect(history.location.pathname).toBe('/profile');
    });

  it('checks if a Ingredient button redirects to "/foods" on click',
    async () => {
      const { history } = renderWithRouterRedux(<App />, {
        initialEntries: [PATH], initialState });

      const chickenBtn = await screen.findByRole('img', { name: 'Gin' });
      userEvent.click(chickenBtn);

      expect(history.location.pathname).toBe('/drinks');
    });

  it('checks if Footer Drink, Explore and Food icons redirect to expected paths on click',
    () => {
      jest.restoreAllMocks();

      jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
          json: () => Promise.resolve(categories),
        }));
      const { history } = renderWithRouterRedux(<DrinksIngredients />,
        { initialEntries: [PATH] });

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
