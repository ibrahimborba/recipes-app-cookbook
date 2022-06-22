import React from 'react';
import style from './StartButton.module.css';

function StartButton() {
  return (
    <button
      className={ style.button }
      data-testid="start-recipe-btn"
      type="button"
      onClick={ () => console.log('comecou') }
    >
      Start Recipe
    </button>
  );
}

export default StartButton;
