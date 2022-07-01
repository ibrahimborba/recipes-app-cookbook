import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';

const PATH = '/explore/drinks/nationalities';

describe('1 - NotFound page, testing components render', () => {
  it('checks if Not Found text is rendered if a non existing path is used',
    () => {
      renderWithRouterRedux(<App />, { initialEntries: [PATH] });

      const mainTitle = screen.getByRole('heading', { level: 1, name: /Oops!/i });
      const notFoundText = screen.getByRole(
        'heading',
        { level: 2, name: /We couldn't find the page you are looking for./i },
      );
      const pageTitle = screen.getByRole(
        'heading',
        { level: 3, name: /But you can have a donut or go back to Recipes./i },
      );

      expect(mainTitle).toBeInTheDocument();
      expect(notFoundText).toBeInTheDocument();
      expect(pageTitle).toBeInTheDocument();
    });

  it('checks if the link is set redirect to /foods',
    () => {
      const { history } = renderWithRouterRedux(<App />, { initialEntries: [PATH] });

      const link = screen.getByRole('link', { name: /go back to Recipes./i });
      expect(link).toBeInTheDocument();

      userEvent.click(link);
      expect(history.location.pathname).toBe('/foods');
    });
});
