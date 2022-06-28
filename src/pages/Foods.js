import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesOptions from '../components/CategoriesOptions';
import CardRecipe from '../components/CardRecipe';
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
         <CardRecipe
           key={ meal.idMeal }
           recipeID={ meal.idMeal }
           recipeImg={ meal.strMealThumb }
           recipeTitle={ meal.strMeal }
           index={ index }
         />
       ))}
      <Footer />
    </>
  );
}

export default Foods;
