import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFavoriteRecipes, updateFavoriteRecipes } from '../services/mealsLocalSt';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import homeIcon from '../images/homeIcon.svg';
import StyledRecipeTitle from '../styled/StyledRecipeTitle';

function RecipeTitle() {
  const history = useHistory();
  const {
    currentRecipe,
    currentRecipe: { categoryRecom, category, id, title, type },
  } = useSelector((state) => state.recipe);

  const [showMessage, setShowMessage] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const recipes = getFavoriteRecipes();

    if (recipes.length !== 0) {
      const hasRecipe = recipes.some(({ id: recipeId }) => recipeId === id);

      setIsFavorited(hasRecipe);
    }
  }, [id]);

  const copyToClipBoard = () => {
    const url = window.location.href.replace('/in-progress', '');
    clipboardCopy(url);

    const SECONDS = 2000;

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), SECONDS);
  };

  const favoriteRecipe = () => {
    const { image, nationality, alcoholic } = currentRecipe;

    const recipeFavorited = {
      id,
      type,
      nationality: nationality || '',
      category: category || '',
      alcoholicOrNot: alcoholic || '',
      name: title,
      image,
    };

    updateFavoriteRecipes(recipeFavorited);
    setIsFavorited(!isFavorited);
  };

  return (
    <StyledRecipeTitle>
      <div className="recipe-bar">
        <h2 data-testid="recipe-title" className="recipe-bar-title">{ title }</h2>
        <div className="recipe-bar-buttons-container">
          {
            showMessage
              && (
                <span>Link copied!</span>
              )
          }
          <button
            className="bar-button"
            type="button"
            onClick={ () => history.push(`/${type}s`) }
          >
            <img
              className="icon"
              src={ homeIcon }
              alt="home icon"
            />
          </button>
          <button
            className="bar-button"
            data-testid="share-btn"
            type="button"
            onClick={ copyToClipBoard }
          >
            <img className="icon" src={ shareIcon } alt="share icon" />
          </button>
          <button
            className="bar-button"
            type="button"
            onClick={ favoriteRecipe }
          >
            <img
              className="icon"
              data-testid="favorite-btn"
              src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
              alt="favorite icon"
            />
          </button>
        </div>
      </div>
      <p data-testid="recipe-category" className="recipe-category">{ categoryRecom }</p>
    </StyledRecipeTitle>
  );
}

export default RecipeTitle;
