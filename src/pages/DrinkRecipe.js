import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CoverImage from '../components/CoverImage';
import Loading from '../components/Loading';
import Recipe from '../components/Recipe';
import StartButton from '../components/StartButton';
import { fetchRecipeThunk, getRecommendationsThunk } from '../redux/actions';

function DrinkRecipe() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isFetching } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipeThunk(id, 'drink'));
    dispatch(getRecommendationsThunk('food'));
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
              <Recipe />
              <StartButton />
            </>
          )
      }
    </section>
  );
}

export default DrinkRecipe;
