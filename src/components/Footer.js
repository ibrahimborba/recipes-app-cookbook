import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer-class">
      <input
        type="image"
        src={ drinkIcon }
        alt="drink-icon"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      />
      <input
        type="image"
        src={ exploreIcon }
        alt="explore-icon"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="meal-icon"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
      />
    </footer>
  );
}

export default Footer;
