import React from 'react';
import { useSelector } from 'react-redux';

function CoverImage() {
  const { currentRecipe } = useSelector((state) => state.recipe);

  return (
    <img
      data-testid="recipe-photo"
      src={ currentRecipe.image }
      alt="Recipe"
    />
  );
}

export default CoverImage;
