import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Recipe from '../components/Recipe';
import StartButton from '../components/StartButton';
import { fetchRecipeThunk, getRecommendationsThunk } from '../redux/actions';

function DrinkRecipe() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchRecipeThunk(id, 'drink'));
    dispatch(getRecommendationsThunk('food'));
  }, [dispatch, id]);

  return (
    <>
      <Recipe />
      <StartButton />
    </>
  );
}

export default DrinkRecipe;
