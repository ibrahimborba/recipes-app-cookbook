import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods() {
  const MAX_ITEMS_DISPLAY = 12;
  const mealResults = useSelector((state) => state.searchResults.meals);

  return (
    <>
      <Header enableSearch />
      <div>Foods</div>
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
