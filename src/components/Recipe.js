import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import RecipeDetails from './RecipeDetails';
import RecipeTitle from './RecipeTitle';
import Recommended from './Recommended';
import Loading from './Loading';
import StyledRecipe from '../styled/StyledRecipe';

function Recipe({ isFood }) {
  const {
    currentRecipe: { video, image }, inProgress, isFetching,
  } = useSelector((state) => state.recipe);

  const [url, setUrl] = useState();

  const formatUrl = useCallback(() => {
    const urlFormatted = video?.replace('watch?v=', 'embed/');

    setUrl(urlFormatted);
  }, [video]);

  useEffect(() => {
    formatUrl();
  }, [formatUrl]);

  return (
    <StyledRecipe>
      {
        isFetching
          ? <Loading />
          : (
            <>
              <div className="recipe-img-container">
                <img
                  data-testid="recipe-photo"
                  className="recice-img"
                  src={ image }
                  alt="Recipe"
                />
              </div>
              <section
                className="recipe-container"
              >
                <RecipeTitle />
                <RecipeDetails />
                {
                  !inProgress
                  && (
                    <>
                      {
                        isFood
                          && (
                            <div>
                              <h3 className="recipe-video-title">Video</h3>
                              <iframe
                                className="recipe-video"
                                data-testid="video"
                                width="560"
                                height="315"
                                src={ url }
                                title="YouTube video player"
                                allowFullScreen
                              />
                            </div>
                          )
                      }
                      <Recommended />
                    </>
                  )
                }
              </section>
            </>
          )
      }
    </StyledRecipe>
  );
}

Recipe.propTypes = {
  isFood: PropTypes.bool,
};

Recipe.defaultProps = {
  isFood: false,
};

export default Recipe;
