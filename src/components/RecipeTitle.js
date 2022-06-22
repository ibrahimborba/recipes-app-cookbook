import React from 'react';
import { useSelector } from 'react-redux';

function RecipeTitle() {
  const {
    category,
    title,
  } = useSelector((state) => state.recipe.currentRecipe);

  return (
    <div>
      <div>
        <h2 data-testid="recipe-title">{ title }</h2>
        <div>
          <button
            data-testid="share-btn"
            type="button"
          >
            Share
          </button>
          <input
            data-testid="favorite-btn"
            type="checkbox"
          />
        </div>
      </div>
      <p data-testid="recipe-category">{ category }</p>
    </div>
  );
}

export default RecipeTitle;
