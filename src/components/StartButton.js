import React from 'react';

function StartButton() {
  return (
    <button
      type="button"
      onClick={ () => console.log('comecou') }
    >
      Start Recipe
    </button>
  );
}

export default StartButton;
