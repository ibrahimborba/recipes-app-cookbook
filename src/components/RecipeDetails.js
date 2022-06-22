import React from 'react';
import { useSelector } from 'react-redux';

function RecipeDetails() {
  const {
    currentRecipe: { instructions, ingredients }, inProgress,
  } = useSelector((state) => state.recipe);

  return (
    <>
      <div>
        <h3>Ingredients</h3>
        <ul style={ { backgroundColor: 'grey' } }>
          {
            inProgress
              ? (
                <>
                  {ingredients.map((ingredient, index) => (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ `ingredient${index}` }
                    >
                      <label
                        htmlFor={ `ingredient${index}` }
                      >
                        <input
                          id={ `ingredient${index}` }
                          type="checkbox"
                        />
                        { `${ingredient[0]} - ${ingredient[1]}`}
                      </label>
                    </li>
                  ))}
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
