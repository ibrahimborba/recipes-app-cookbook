import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updateUser } from '../services/userLocalSt';
import saveTokenMeals from '../services/mealsLocalSt';
import { StyledLogin, StyledCard } from '../styled/StyledLogin';

/* Pre merge branch */

function Login() {
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '', password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleSubmitBtn = (event) => {
    event.preventDefault();

    updateUser(user.email);
    saveTokenMeals();

    history.push('/foods');
  };

  useEffect(() => {
    const passwordTest = 6;
    const emailTest = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    setIsDisabled(!(emailTest.test(user.email) && user.password.length > passwordTest));
  }, [user.email, user.password]);

  return (
    <StyledLogin>
      <h1>Login</h1>
      <StyledCard>
        <form onSubmit={ handleSubmitBtn }>
          <label htmlFor="email">
            Email:
            <input
              name="email"
              type="email"
              data-testid="email-input"
              value={ user.email }
              onChange={ handleChange }
              placeholder="Type your e-mail"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              autoComplete="current-password"
              name="password"
              type="password"
              data-testid="password-input"
              value={ user.password }
              onChange={ handleChange }
              placeholder="Type your password"
            />
          </label>
          <button
            name="submit"
            type="submit"
            data-testid="login-submit-btn"
            disabled={ isDisabled }
          >
            Enter
          </button>
        </form>
      </StyledCard>
    </StyledLogin>

  );
}

export default Login;
