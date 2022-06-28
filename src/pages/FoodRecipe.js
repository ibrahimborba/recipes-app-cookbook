import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CoverImage from '../components/CoverImage';
import Loading from '../components/Loading';
import Recipe from '../components/Recipe';
import StartButton from '../components/StartButton';
import { fetchRecipeThunk, getRecommendationsThunk } from '../redux/actions';

function FoodRecipe() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isFetching } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipeThunk(id, 'food'));
    dispatch(getRecommendationsThunk('drink'));
  }, [dispatch, id]);

  return (
    <section>
      {
        isFetching
          ? (
            <Loading />
          )
          : (
            <>
              <CoverImage />
              <Recipe isFood />
              <StartButton />
            </>
          )
      }
    </section>
  );
}

export default FoodRecipe;
