import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';

describe('1 - Foods page Header component tests', () => {
  it('checks if Header is rendered and behaves as expected', async () => {
    const { history } = renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
    });

    expect(history.location.pathname).toBe('/foods');

    const pageTitle = screen.getByRole('heading', { name: 'Foods', level: 1 });
    const profileImg = screen.getByRole('img', { name: 'profile icon' });
    const searchBtn = screen.getByRole('img', { name: 'search icon' });
    const searchInputDisabled = screen.queryByLabelText('Search');

    expect(pageTitle).toBeInTheDocument();
    expect(profileImg).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(searchInputDisabled).not.toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInputEnabled = await screen.findByLabelText('Search');
    expect(searchInputEnabled).toBeInTheDocument();
  });
});

describe('2 - Foods page SearchBar component tests', () => {
  it('checks if SearchBar is rendered as expected', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
    });

    const searchBtnHeader = screen.getByRole('img', { name: 'search icon' });
    expect(searchBtnHeader).toBeInTheDocument();
    userEvent.click(searchBtnHeader);

    const searchInput = await screen.findByLabelText('Search');
    const searchOptionIngredient = screen.getByLabelText('Ingredient');
    const searchOptionName = screen.getByLabelText('Name');
    const searchOptionFirst = screen.getByLabelText('First Letter');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    expect(searchInput).toBeInTheDocument();
    expect(searchOptionIngredient).toBeInTheDocument();
    expect(searchOptionName).toBeInTheDocument();
    expect(searchOptionFirst).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});

describe('3 - Foods page CategoriesOptions component tests', () => {
  it('checks if CategoriesOptions is rendered as expected', async () => {
    renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
    });

    const categoryBtnAll = screen.getByRole('button', { name: 'All' });
    expect(categoryBtnAll).toBeInTheDocument();
  });
});

describe('4 - Foods page Footer component tests', () => {
  it('checks if Footer is rendered as expected', async () => {
    const { history } = renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
    });

    const drinksBtnFooter = screen.getByTestId('drinks-bottom-btn');
    const exploreBtnFooter = screen.getByTestId('explore-bottom-btn');
    const mealBtnFooter = screen.getByTestId('food-bottom-btn');

    expect(drinksBtnFooter).toBeInTheDocument();
    expect(exploreBtnFooter).toBeInTheDocument();
    expect(mealBtnFooter).toBeInTheDocument();

    userEvent.click(drinksBtnFooter);

    expect(history.location.pathname).toBe('/drinks');
  });

  it('checks if Buttons click changes the path as expected', async () => {
    const { history } = renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
    });

    const drinksBtnFooter = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtnFooter);
    expect(history.location.pathname).toBe('/drinks');

    const exploreBtnFooter = screen.getByTestId('explore-bottom-btn');
    userEvent.click(exploreBtnFooter);
    expect(history.location.pathname).toBe('/explore');

    const mealBtnFooter = screen.getByTestId('food-bottom-btn');
    userEvent.click(mealBtnFooter);
    expect(history.location.pathname).toBe('/foods');
  });
});
