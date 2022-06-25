import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';

const PATH = '/done-recipes';

describe('1 - Done page inputs tests', () => {
  it('checks if doneRecipes page elements are rendered as expected', () => {
    const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });
    expect(history.location.pathname).toBe('/done-recipes');

    const allBtn = screen.getByText(/All/i);
    const foodBtn = screen.getByText(/Food/i);
    const drinksBtn = screen.getByText(/Drinks/i);

    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });
});
