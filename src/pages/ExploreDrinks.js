import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomDrinkResults } from '../redux/actions';

function ExploreDrinks() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const randomDrinkResults = useSelector((state) => state.randomResults.drinks);

  const handleRandomDrinks = async () => {
    await dispatch(fetchRandomDrinkResults(pathname));
    setIsFetched(true);
  };

  useEffect(() => {
    if (isFetched) {
      history.push(`/drinks/${randomDrinkResults[0].idDrink}`);
    }
  }, [isFetched, history, randomDrinkResults]);
  return (
    <>
      <Header />
      <form>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleRandomDrinks }
        >
          Surprise me
        </button>
      </form>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
