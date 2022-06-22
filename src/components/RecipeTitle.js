import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';

function RecipeTitle() {
  const {
    category,
    title,
  } = useSelector((state) => state.recipe.currentRecipe);

  const [showMessage, setShowMessage] = useState(false);

  const copyClipBoard = () => {
    const SECONDS = 1500;
    navigator.clipboard.writeText(`${window.location.href}`);

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), SECONDS);
  };

  return (
    <div>
      <div>
        <h2 data-testid="recipe-title">{ title }</h2>
        <div>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ copyClipBoard }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          {
            showMessage
              && (
                <span>Link copied!</span>
              )
          }
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
