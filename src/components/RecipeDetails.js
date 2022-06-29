import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFinishButtonStatus, updateToInProgress } from '../redux/actions';
import { getInProgressRecipes, updateIngredients } from '../services/mealsLocalSt';
import StyledRecipeDetails from '../styled/StyledRecipeDetails';

function RecipeDetails() {
  const dispatch = useDispatch();
  const {
    currentRecipe: { instructions, ingredients, group, id }, inProgress,
  } = useSelector((state) => state.recipe);

  const [done, setDone] = useState([]);
  const [instr, setInstr] = useState([]);

  useEffect(() => {
    if (group) {
      const { [group]: { [id]: recipe } } = getInProgressRecipes();

      if (recipe) {
        setDone([...recipe]);

        const allIngredientsChecked = recipe.length === ingredients.length;
        dispatch(updateFinishButtonStatus(!allIngredientsChecked));
      }
    }

    setInstr([...instructions]);
  }, [group, id, instructions, dispatch, ingredients.length]);

  useEffect(() => () => dispatch(updateToInProgress(false)), [dispatch]);

  const updateIngredientStatus = ({ target: { name } }) => {
    updateIngredients(id, name, group);

    const { [group]: { [id]: recipe } } = getInProgressRecipes();
    setDone([...recipe]);

    const allIngredientsChecked = recipe.length === ingredients.length;
    dispatch(updateFinishButtonStatus(!allIngredientsChecked));
  };

  return (
    <StyledRecipeDetails>
      <div
        className="recipe-details"
      >
        <h3
          className="recipe-details-title"
        >
          Ingredients
        </h3>
        <ul>
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
                        className="recipe-details-ingredient"
                        data-testid={ `${index}-ingredient-step` }
                        key={ `ingredient${index}` }
                      >
                        <label
                          htmlFor={ `ingredient${index}` }
                        >
                          <input
                            className="ingredient-checkbox"
                            id={ `ingredient${index}` }
                            name={ ingredientName }
                            type="checkbox"
                            checked={ isChecked }
                            onChange={ updateIngredientStatus }
                          />
                          <span
                            className={ isChecked ? 'checked' : '' }
                          >
                            { `- ${ingredientName}` }
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
                        className="recipe-details-ingredient"
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ `ingredient${index}` }
                      >
                        { `- ${ingredientName}` }
                      </li>
                    );
                  })}
                </>
              )
          }
        </ul>
      </div>
      <div className="recipe-details">
        <h3 className="recipe-details-title">Instructions</h3>
        <div data-testid="instructions">
          {
            instr?.map((paragraph, index) => (
              <p key={ index } className="recipe-details-instructions">{paragraph}</p>
            ))
          }
        </div>
      </div>
    </StyledRecipeDetails>
  );
}

export default RecipeDetails;
