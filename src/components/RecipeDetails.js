import React from 'react';
import { useSelector } from 'react-redux';

const inProgress = true;

function RecipeDetails() {
  const {
    recipeReceived: { strInstructions: instructions },
    ingredients,
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
                    <li key={ `ingredient${index}` }>
                      <label
                        data-testid={ `${index}-ingredient-name-and-measure` }
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
                  <li>number odasdane</li>
                  <li>number dasdasde</li>
                  <li>number oadsdane</li>
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
