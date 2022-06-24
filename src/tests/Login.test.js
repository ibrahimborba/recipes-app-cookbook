import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouterRedux from './helpers/renderWithRouterRedux';

const VALID_EMAIL = 'test@test.test';
const INVALID_EMAIL = 'testtest.test';
const VALID_PASSWORD = '1234567';
const INVALID_PASSWORD = '12345';

describe('1 - Login page inputs tests', () => {
  it('checks if Login page elements are rendered as expected', () => {
    const { history } = renderWithRouterRedux(<Login />);
    const loginTitles = screen.getByText(/Login/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Senha:/i);
    const submitBtn = screen.getByText(/Enter/i);

    expect(history.location.pathname).toBe('/');
    expect(loginTitles).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  describe('2 - Checks if Login page elements behave as expected', () => {
    it('checks if correct email and password validations behave as expected', () => {
      renderWithRouterRedux(<Login />);

      const emailInput = screen.getByLabelText(/Email:/i);
      const passwordInput = screen.getByLabelText(/Senha:/i);
      const submitBtn = screen.getByText(/Enter/i);

      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();

      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);

      expect(submitBtn).not.toBeDisabled();
    });

    it('checks if wrong email and password validations behave as expected', () => {
      renderWithRouterRedux(<Login />);

      const emailInput = screen.getByLabelText(/Email:/i);
      const passwordInput = screen.getByLabelText(/Senha:/i);
      const submitBtn = screen.getByText(/Enter/i);

      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();

      userEvent.type(emailInput, INVALID_EMAIL);
      userEvent.type(passwordInput, INVALID_PASSWORD);

      expect(submitBtn).toBeDisabled();
    });

    it('checks if submit button pushes to foods page', () => {
      const { history } = renderWithRouterRedux(<Login />);

      const emailInput = screen.getByLabelText(/Email:/i);
      const passwordInput = screen.getByLabelText(/Senha:/i);
      const submitBtn = screen.getByText(/Enter/i);

      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();

      userEvent.type(emailInput, VALID_EMAIL);
      userEvent.type(passwordInput, VALID_PASSWORD);

      expect(submitBtn).not.toBeDisabled();

      userEvent.click(submitBtn);

      expect(history.location.pathname).toBe('/foods');
    });
  });
});
