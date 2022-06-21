import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from './RecipeDetails';
import RecipeTitle from './RecipeTitle';
import Recommended from './Recommended';
import Midia from './Midia';

function Recipe({ type }) {
  return (
    <section>
      <img data-testid="recipe-photo" src="#" alt="Recipe" />
      <section>
        <RecipeTitle />
        <RecipeDetails />
        { type === 'food'
          && (
            <Midia />
          )}
        <Recommended />
      </section>
    </section>
  );
}

Recipe.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recipe;
