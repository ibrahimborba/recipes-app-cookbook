import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import RecipeDetails from './RecipeDetails';
import RecipeTitle from './RecipeTitle';
import Recommended from './Recommended';

function Recipe({ isFood }) {
  const { video } = useSelector((state) => state.recipe.currentRecipe);

  const [url, setUrl] = useState();

  const formatUrl = useCallback(() => {
    const urlFormatted = video?.replace('watch?v=', 'embed/');

    setUrl(urlFormatted);
  }, [video]);

  useEffect(() => {
    formatUrl();
  }, [formatUrl]);

  return (
    <section>
      <RecipeTitle />
      <RecipeDetails />
      {
        isFood
          && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ url }
              title="YouTube video player"
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
