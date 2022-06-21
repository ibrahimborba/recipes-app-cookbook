import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from './RecipeDetails';
import RecipeTitle from './RecipeTitle';
import Recommended from './Recommended';

function Recipe({ isFood }) {
  return (
    <section>
      <RecipeTitle />
      <RecipeDetails />
      {
        isFood
          && (
            <iframe
              width="560"
              height="315"
              src="#"
              title="YouTube video player"
              frameBorder="0"
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture"
              allowFullScreen
            />
          )
      }
      <Recommended />
    </section>
  );
}

Recipe.propTypes = {
  isFood: PropTypes.bool,
};

Recipe.defaultProps = {
  isFood: false,
};

export default Recipe;
