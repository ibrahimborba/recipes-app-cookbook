import React from 'react';

function StartButton() {
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      onClick={ () => console.log('comecou') }
    >
      Start Recipe
    </button>
  );
}

export default StartButton;
