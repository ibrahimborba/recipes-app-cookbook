import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Recipe from '../components/Recipe';
import StartButton from '../components/StartButton';
import { fetchRecipeThunk, updateToInProgress } from '../redux/actions';
import { updateInProgressRecipes } from '../services/mealsLocalSt';

function DrinkRecipeInProgress() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    currentRecipe,
    currentRecipe: { group },
  } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (currentRecipe.id === '') dispatch(fetchRecipeThunk(id, 'drink'));

    if (group) {
      dispatch(updateToInProgress());
      updateInProgressRecipes({ [id]: [] }, group);
    }
  }, [dispatch, id, currentRecipe, group]);

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ currentRecipe.image }
        alt="Recipe"
      />
      <Recipe />
      <StartButton />
    </section>
  );
}

export default DrinkRecipeInProgress;
