import React from 'react';
import Recipe from '../components/Recipe';
import StartButton from '../components/StartButton';

function FoodRecipe() {
  return (
    <section>
      <img data-testid="recipe-photo" src="#" alt="Recipe" />
      <Recipe isFood />
      <StartButton />
    </section>
  );
}

export default FoodRecipe;
