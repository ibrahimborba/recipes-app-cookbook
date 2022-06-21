import React from 'react';
import Recipe from '../components/Recipe';
import StartButton from '../components/StartButton';

function DrinkRecipe() {
  return (
    <section>
      <img data-testid="recipe-photo" src="#" alt="Recipe" />
      <Recipe />
      <StartButton />
    </section>
  );
}

export default DrinkRecipe;
