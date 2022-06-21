import React from 'react';

const inProgress = true;

function RecipeDetails() {
  return (
    <>
      <div>
        <h3>Ingredients</h3>
        <ul style={ { backgroundColor: 'grey' } }>
          {
            inProgress
              ? (
                <>
                  <li>
                    <label htmlFor="numberOne">
                      <input
                        id="numberOne"
                        type="checkbox"
                      />
                      ingredient number one
                    </label>
                  </li>
                  <li>
                    <label htmlFor="numberTwo">
                      <input
                        id="numberTwo"
                        type="checkbox"
                      />
                      ingredient number two
                    </label>
                  </li>
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
        <div>
          Text Right here
        </div>
      </div>
    </>
  );
}

export default RecipeDetails;
