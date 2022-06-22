import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRecipesDone } from '../services/mealsLocalSt';
import style from './StartButton.module.css';

function StartButton() {
  const [isToShow, setIsToShow] = useState(true);
  const { id } = useSelector((state) => state.recipe.currentRecipe);

  useEffect(() => {
    const recipes = getRecipesDone();

    if (recipes.length !== 0) {
      const isARecipeThere = recipes.some(({ id: recipeId }) => recipeId === id);

      setIsToShow(!isARecipeThere);
    }
  }, [id]);

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
              Start Recipe
            </button>
          )
      }
    </div>
  );
}

export default StartButton;
