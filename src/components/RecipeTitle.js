import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFavoriteRecipes, updateFavoriteRecipes } from '../services/mealsLocalSt';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import StyledRecipeTitle from '../styled/StyledRecipeTitle';

function RecipeTitle() {
  const {
    currentRecipe,
    currentRecipe: { categoryRecom, category, id, title },
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
    window.navigator.clipboard.writeText(url);

    const SECONDS = 2000;

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), SECONDS);
  };

  const favoriteRecipe = () => {
    const { image, type, nationality, alcoholic } = currentRecipe;

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
      <div>
        <h2 data-testid="recipe-title">{ title }</h2>
        <div>
          {
            showMessage
              && (
                <span>Link copied!</span>
              )
          }
          <button
            data-testid="share-btn"
            type="button"
            onClick={ copyToClipBoard }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          <button
            type="button"
            onClick={ favoriteRecipe }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
              alt="favorite icon"
            />
          </button>
        </div>
      </div>
      <p data-testid="recipe-category">{ categoryRecom }</p>
    </StyledRecipeTitle>
  );
}

export default RecipeTitle;
