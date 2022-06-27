import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';
import categories from './mocks/categoriesMeal';
import Profile from '../pages/Profile';

const PATH = '/profile';
const setAllLocalStorageKeys = () => {
  localStorage.setItem('user', JSON.stringify({ email: 'user@email.com' }));
  localStorage.setItem('doneRecipes', JSON.stringify([]));
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
};

describe('1 - Profile page, testing components render', () => {
  beforeEach(() => setAllLocalStorageKeys());
  afterEach(() => localStorage.clear());

  it('checks if Header is rendered with Profile image and page Title',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const pageTitle = screen.getByRole('heading', { name: 'Profile', level: 1 });
      const profileImg = screen.getByRole('img', { name: 'profile icon' });
      expect(pageTitle).toBeInTheDocument();
      expect(profileImg).toBeInTheDocument();
    });

  it('checks if user Email logged in is rendered',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const userEmail = screen.getByText('user@email.com');
      expect(userEmail).toBeInTheDocument();
    });

  it('checks if DoneRecipes, FavoriteRecipes and Logout buttons are rendered',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const doneBtn = screen.getByText('Done Recipes');
      const favoriteBtn = screen.getByText('Favorite Recipes');
      const logoutBtn = screen.getByText('Logout');
      expect(doneBtn).toBeInTheDocument();
      expect(favoriteBtn).toBeInTheDocument();
      expect(logoutBtn).toBeInTheDocument();
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

describe('2 - Profile page, testing buttons redirect to expected paths', () => {
  beforeEach(() => setAllLocalStorageKeys());
  afterEach(() => localStorage.clear());

  it('checks if DoneRecipes button redirects to "/done-recipes" on click',
    () => {
      const { history } = renderWithRouterRedux(<Profile />, { initialEntries: [PATH] });
      const doneBtn = screen.getByText('Done Recipes');
      userEvent.click(doneBtn);
      console.log(history.location.pathname);
      expect(history.location.pathname).toBe('/done-recipes');
    });

  it('checks if FavoriteRecipes button redirects to "/favorite-recipes" on click',
    () => {
      const { history } = renderWithRouterRedux(<Profile />, { initialEntries: [PATH] });
      const favoriteBtn = screen.getByText('Favorite Recipes');
      userEvent.click(favoriteBtn);
      console.log(history.location.pathname);
      expect(history.location.pathname).toBe('/favorite-recipes');
    });

  it('checks if Logout button redirects to "/" on click',
    () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const logoutBtn = screen.getByText('Logout');
      userEvent.click(logoutBtn);
      expect(history.location.pathname).toBe('/');
    });

  it('checks if Footer Drink, Explore and Food icons redirect to expected paths on click',
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
