import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMealResults } from '../redux/actions';

function Foods() {
  const dispatch = useDispatch();
  const mealResults = useSelector((state) => state.searchResults.meals);

  const MAX_ITEMS_DISPLAY = 12;

  useEffect(() => {
    dispatch(fetchMealResults(''));
  }, [dispatch]);

  return (
    <>
      <Header enableSearch />
      { mealResults.length > 1
       && mealResults.slice(0, MAX_ITEMS_DISPLAY).map((meal, index) => (
         <div
           key={ meal.idMeal }
           data-testid={ `${index}-recipe-card` }
         >
           <img
             data-testid={ `${index}-card-img` }
             src={ meal.strMealThumb }
             alt={ meal.strMeal }
             style={ { width: '200px' } }
           />
           <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
         </div>
       ))}
      <Footer />
    </>
  );
}

export default Foods;
