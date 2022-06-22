import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getInProgressRecipes, getRecipesDone } from '../services/mealsLocalSt';
import style from './StartButton.module.css';

function StartButton() {
  const { id, type } = useSelector((state) => state.recipe.currentRecipe);

  const [isToShow, setIsToShow] = useState(true);
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    const recipes = getRecipesDone();

    if (recipes.length !== 0) {
      const hasRecipe = recipes.some(({ id: recipeId }) => recipeId === id);

      setIsToShow(!hasRecipe);
    }
  }, [id]);

  useEffect(() => {
    if (type) {
      const { [type]: recipes } = getInProgressRecipes();
      const hasRecipeInProgress = Object
        .keys(recipes)
        .some((recipeId) => recipeId === id);

      if (hasRecipeInProgress) {
        setButtonText('Continue Recipe');
      } else {
        setButtonText('Start Recipe');
      }
    }
  }, [id, type]);

  return (
    <div>
      {
        isToShow
          && (
            <button
              className={ style.button }
              data-testid="start-recipe-btn"
              type="button"
              onClick={ () => console.log('comecou') }
            >
              { buttonText }
            </button>
          )
      }
    </div>
  );
}

export default StartButton;
