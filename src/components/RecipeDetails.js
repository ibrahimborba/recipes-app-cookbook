import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFinishButtonStatus } from '../redux/actions';
import { getInProgressRecipes, updateIngredients } from '../services/mealsLocalSt';
import style from './RecipeDetails.module.css';

function RecipeDetails() {
  const dispatch = useDispatch();
  const {
    currentRecipe: { instructions, ingredients, group, id }, inProgress,
  } = useSelector((state) => state.recipe);

  const [done, setDone] = useState([]);

  useEffect(() => {
    if (group) {
      const { [group]: { [id]: recipe } } = getInProgressRecipes();

      if (recipe) setDone([...recipe]);
    }
  }, [group, id]);

  const updateIngredientStatus = ({ target: { name } }) => {
    updateIngredients(id, name, group);

    const { [group]: { [id]: recipe } } = getInProgressRecipes();
    setDone([...recipe]);

    const allIngredientsChecked = recipe.length === ingredients.length;
    dispatch(updateFinishButtonStatus(!allIngredientsChecked));
  };

  return (
    <>
      <div>
        <h3>Ingredients</h3>
        <ul style={ { backgroundColor: 'grey' } }>
          {
            inProgress
              ? (
                <>
                  {ingredients.map((ingredient, index) => {
                    const ingredientName = ingredient[1] !== null
                      ? `${ingredient[0]} - ${ingredient[1]}` : `${ingredient[0]}`;
                    const isChecked = done.some((name) => name === ingredientName);

                    return (
                      <li
                        data-testid={ `${index}-ingredient-step` }
                        key={ `ingredient${index}` }
                      >
                        <label
                          htmlFor={ `ingredient${index}` }
                        >
                          <input
                            id={ `ingredient${index}` }
                            name={ ingredientName }
                            type="checkbox"
                            checked={ isChecked }
                            onChange={ updateIngredientStatus }
                          />
                          <span
                            className={ isChecked ? style.checked : '' }
                          >
                            { ingredientName }
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </>
              )
              : (
                <>
                  {ingredients.map((ingredient, index) => {
                    const ingredientName = ingredient[1] !== null
                      ? `${ingredient[0]} - ${ingredient[1]}` : `${ingredient[0]}`;

                    return (
                      <li
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ `ingredient${index}` }
                      >
                        { ingredientName }
                      </li>
                    );
                  })}
                </>
              )
          }
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <div data-testid="instructions">
          {instructions}
        </div>
      </div>
    </>
  );
}

export default RecipeDetails;
