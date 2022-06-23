import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CoverImage from '../components/CoverImage';
import Recipe from '../components/Recipe';
import StartButton from '../components/StartButton';
import { fetchRecipeThunk, updateToInProgress } from '../redux/actions';
import { updateRecipeStatus } from '../services/mealsLocalSt';

function FoodRecipeInProgress() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    currentRecipe,
    currentRecipe: { group },
  } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (currentRecipe.id === '') dispatch(fetchRecipeThunk(id, 'food'));

    if (group) {
      dispatch(updateToInProgress());
      updateRecipeStatus(id, group);
    }
  }, [dispatch, id, currentRecipe, group]);

  return (
    <section>
      <CoverImage />
      <Recipe />
      <StartButton />
    </section>
  );
}

export default FoodRecipeInProgress;
