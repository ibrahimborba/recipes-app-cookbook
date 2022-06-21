import React from 'react';

function RecipeTitle() {
  return (
    <div>
      <div>
        <h2 data-testid="recipe-title">Title</h2>
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
      <p data-testid="recipe-category">Category</p>
    </div>
  );
}

export default RecipeTitle;
