import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getFavoriteRecipes, updateFavoriteRecipes } from '../services/mealsLocalSt';

function RecipeTitle() {
  const {
    currentRecipe,
    currentRecipe: { category, id, title },
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
    navigator.clipboard.writeText(`${window.location.href}`);

    const SECONDS = 1500;

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
    <div>
      <div>
        <h2 data-testid="recipe-title">{ title }</h2>
        <div>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ copyToClipBoard }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          {
            showMessage
              && (
                <span>Link copied!</span>
              )
          }
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
      <p data-testid="recipe-category">{ category }</p>
    </div>
  );
}

export default RecipeTitle;
