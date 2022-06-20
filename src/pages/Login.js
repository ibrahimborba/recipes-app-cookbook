import React from 'react';

function Login() {
  return (
    <div>
      Login
      <form>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            name="password"
            type="password"
            data-testid="password-input"
          />
        </label>
      </form>
    </div>
  );
}

export default Login;
