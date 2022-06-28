import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import StyledCardRecipe from '../styled/StyledCardRecipe';

function CardRecipe({ recipeID, recipeImg, recipeTitle, index }) {
  const { pathname } = useLocation();

  return (
    <Link to={ `${pathname}/${recipeID}` }>
      <StyledCardRecipe data-testid={ `${index}-recipe-card` } recipeImg>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipeImg }
          alt={ recipeTitle }
          style={ { width: '200px' } }
        />
        <h3 data-testid={ `${index}-card-name` }>{ recipeTitle }</h3>
      </StyledCardRecipe>
    </Link>
  );
}

CardRecipe.propTypes = {
  recipeID: PropTypes.string.isRequired,
  recipeImg: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipe;
