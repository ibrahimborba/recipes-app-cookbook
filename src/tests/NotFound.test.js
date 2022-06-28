import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';

const PATH = '/explore/drinks/nationalities';

describe('1 - NotFound page, testing components render', () => {
  it('checks if Not Found text is rendered if a non existing path is used',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });
      const pageTitle = screen.getByText('Not Found');
      expect(pageTitle).toBeInTheDocument();
    });
});
