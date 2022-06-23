import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updateUser } from '../services/userLocalSt';
import saveTokenMeals from '../services/mealsLocalSt';

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
    <div>
      Login
      <form onSubmit={ handleSubmitBtn }>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            data-testid="email-input"
            value={ user.email }
            onChange={ handleChange }
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
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
