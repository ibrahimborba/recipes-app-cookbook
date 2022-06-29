import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomMealResults } from '../redux/actions';
import StyledExploreFoods from '../styled/StyledExploreFoods';

function ExploreFoods() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const randomMealResults = useSelector((state) => state.randomResults.meals);

  const handleRandom = async () => {
    await dispatch(fetchRandomMealResults(pathname));
    setIsFetched(true);
  };

  useEffect(() => {
    if (isFetched) {
      history.push(`/foods/${randomMealResults[0].idMeal}`);
    }
  }, [isFetched, history, randomMealResults]);

  return (
    <>
      <Header />
      <StyledExploreFoods>
        <button
          className="food-ingredient-btn"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          className="nationality-btn"
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          className="food-surprise-btn"
          type="button"
          data-testid="explore-surprise"
          onClick={ handleRandom }
        >
          Surprise me!
        </button>
      </StyledExploreFoods>
      <Footer />
    </>
  );
}

export default ExploreFoods;
