import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Recipe from '../components/Recipe';
import StartButton from '../components/StartButton';
import { fetchRecipeThunk, getRecommendationsThunk } from '../redux/actions';

function FoodRecipe() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchRecipeThunk(id, 'food'));
    dispatch(getRecommendationsThunk('drink'));
  }, [dispatch, id]);

  return (
    <>
      <Recipe isFood />
      <StartButton />
    </>
  );
}

export default FoodRecipe;
