import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

function RecipeCard({ recipeID, recipeImg, recipeTitle, index }) {
  const { pathname } = useLocation();

  return (
    <Link to={ `${pathname}/${recipeID}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipeImg }
          alt={ recipeTitle }
          style={ { width: '200px' } }
        />
        <h3 data-testid={ `${index}-card-name` }>{ recipeTitle }</h3>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipeID: PropTypes.string.isRequired,
  recipeImg: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
