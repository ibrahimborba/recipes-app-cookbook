import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getInProgressRecipes, updateIngredients } from '../services/mealsLocalSt';
import style from './RecipeDetails.module.css';

function RecipeDetails() {
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

  const finishIngredient = ({ target: { name } }) => {
    updateIngredients(id, name, group);

    const { [group]: { [id]: recipe } } = getInProgressRecipes();
    setDone([...recipe]);
    console.log(done);
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
                    const ingredientName = `${ingredient[0]} - ${ingredient[1]}`;
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
                            onChange={ finishIngredient }
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
                  {ingredients.map((ingredient, index) => (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ `ingredient${index}` }
                    >
                      { `${ingredient[0]} - ${ingredient[1]}`}
                    </li>
                  ))}
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
