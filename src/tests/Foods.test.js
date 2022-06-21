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
