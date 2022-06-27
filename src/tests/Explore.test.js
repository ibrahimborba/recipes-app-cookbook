import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';

// const SEARCH_ICON = 'search icon';
const PATH = '/explore';

describe('1 - Explore page, testing Components render', () => {
  it('checks if Header is rendered with Profile image and page Title',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const pageTitle = screen.getByRole('heading', { name: 'Explore', level: 1 });
      const profileImg = screen.getByRole('img', { name: 'profile icon' });
      expect(pageTitle).toBeInTheDocument();
      expect(profileImg).toBeInTheDocument();
    });

  it('checks if Explore Foods and Drinks buttons are rendered',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const exploreFoodsBtn = screen.getByText('Explore Foods');
      const exploreDrinksBtn = screen.getByText('Explore Drinks');
      expect(exploreFoodsBtn).toBeInTheDocument();
      expect(exploreDrinksBtn).toBeInTheDocument();
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

describe('2 - Explore page, testing buttons redirect to expected paths', () => {
  it('checks if Header Profile image redirects to "/profile" on click',
    () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const profileImg = screen.getByRole('img', { name: 'profile icon' });
      userEvent.click(profileImg);
      expect(history.location.pathname).toBe('/profile');
    });

  it('checks if Explore Foods button redirects to "/explore/foods" on click',
    () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const exploreFoodsBtn = screen.getByText('Explore Foods');
      userEvent.click(exploreFoodsBtn);
      expect(history.location.pathname).toBe('/explore/foods');
    });

  it('checks if Explore Drinks button redirects to "/explore/drinks" on click',
    () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const exploreDrinksBtn = screen.getByText('Explore Drinks');
      userEvent.click(exploreDrinksBtn);
      expect(history.location.pathname).toBe('/explore/drinks');
    });

  it('checks if when Drink, Explore and Food icons redirect to expected paths on click',
    () => {
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
