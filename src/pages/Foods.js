import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Foods() {
  const MAX_ITEMS_DISPLAY = 12;
  const mealResults = useSelector((state) => state.searchResults.meals);

  return (
    <>
      <SearchBar />
      <div>Foods</div>
      { mealResults.length > 1
       && mealResults.slice(0, MAX_ITEMS_DISPLAY).map((meal) => (
         <div
           key={ meal.idMeal }
           data-testid={ `${meal.idMeal}-recipe-card` }
         >
           <img
             data-testid={ `${meal.idMeal}-card-img` }
             src={ meal.strMealThumb }
             alt={ meal.strMeal }
             style={ { width: '200px' } }
           />
           <p data-testid={ `${meal.idMeal}-card-name` }>{ meal.strMeal }</p>
         </div>
       ))}
      <Footer />
    </>
  );
}

export default Foods;
