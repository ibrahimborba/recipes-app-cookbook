import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesOptions from '../components/CategoriesOptions';
import { fetchMealResults } from '../redux/actions';

function Foods() {
  const dispatch = useDispatch();
  const mealResults = useSelector((state) => state.searchResults.meals);
  const searchOptions = useSelector((state) => state.searchOptions);

  const MAX_ITEMS_DISPLAY = 12;

  useEffect(() => {
    const { search, option } = searchOptions;
    dispatch(fetchMealResults(search, option));
  }, [dispatch, searchOptions]);

  return (
    <>
      <Header enableSearch />
      <CategoriesOptions />
      { mealResults.length > 0
       && mealResults.slice(0, MAX_ITEMS_DISPLAY).map((meal, index) => (
         <Link
           key={ meal.idMeal }
           to={ `/foods/${meal.idMeal}` }
         >
           <div
             data-testid={ `${index}-recipe-card` }
           >
             <img
               data-testid={ `${index}-card-img` }
               src={ meal.strMealThumb }
               alt={ meal.strMeal }
               style={ { width: '200px' } }
             />
             <h3 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h3>
           </div>
         </Link>
       ))}
      <Footer />
    </>
  );
}

export default Foods;
