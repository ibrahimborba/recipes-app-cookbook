import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Recipe from '../components/Recipe';
import StartButton from '../components/StartButton';
import { fetchRecipeThunk } from '../redux/actions';

function FoodRecipe() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isFetching, recipeReceived } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(fetchRecipeThunk(id, 'food'));
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
              <img
                data-testid="recipe-photo"
                src={ recipeReceived.strMealThumb }
                alt="Recipe"
              />
              <Recipe isFood />
              <StartButton />
            </>
          )
      }
    </section>
  );
}

export default FoodRecipe;
