import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import StyledFooter from '../styled/StyledFooter';

function Footer() {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <StyledFooter data-testid="footer">
      <button
        className={ pathname === '/drinks' ? 'currentPath' : '' }
        type="button"
        name="drink-icon"
        onClick={ () => history.push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink-icon"
        />
      </button>
      <button
        className={ pathname === '/explore' ? 'currentPath' : '' }
        type="button"
        name="explore-icon"
        onClick={ () => history.push('/explore') }
      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore-icon"
        />
      </button>
      <button
        className={ pathname === '/foods' ? 'currentPath' : '' }
        type="button"
        name="meal-icon"
        onClick={ () => history.push('/foods') }
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal-icon"
        />
      </button>
    </StyledFooter>
  );
}

export default Footer;
