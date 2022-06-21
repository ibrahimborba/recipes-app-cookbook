import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';

describe('Foods page tests', () => {
  it('checks if Header is rendered and behaves as expected', async () => {
    const { history } = renderWithRouterRedux(<App />, {
      initialEntries: ['/foods'],
    });

    expect(history.location.pathname).toBe('/foods');

    const pageTitle = screen.getByRole('heading', { name: 'Foods', level: 1 });
    const profileImg = screen.getByRole('img', { name: 'profile icon' });
    const searchBtn = screen.getByRole('img', { name: 'search icon' });
    const searchInput = screen.queryByRole('textbox', { name: 'text search' });

    expect(pageTitle).toBeInTheDocument();
    expect(profileImg).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(searchInput).not.toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInputEnabled = await screen
      .findByRole('textbox');
    expect(searchInputEnabled).toBeInTheDocument();
  });
});
