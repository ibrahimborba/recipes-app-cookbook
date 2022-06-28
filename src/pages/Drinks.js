import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesOptions from '../components/CategoriesOptions';
import RecipeCard from '../components/RecipeCard';
import { fetchDrinkResults } from '../redux/actions';

function Drinks() {
  const dispatch = useDispatch();
  const drinkResults = useSelector((state) => state.searchResults.drinks);
  const searchOptions = useSelector((state) => state.searchOptions);

  const MAX_ITEMS_DISPLAY = 12;

  useEffect(() => {
    const { search, option } = searchOptions;
    dispatch(fetchDrinkResults(search, option));
  }, [dispatch, searchOptions]);

  return (
    <>
      <Header enableSearch />
      <CategoriesOptions />
      { drinkResults.length > 0
       && drinkResults.slice(0, MAX_ITEMS_DISPLAY).map((drink, index) => (
         <RecipeCard
           key={ drink.idDrink }
           recipeID={ drink.idDrink }
           recipeImg={ drink.strDrinkThumb }
           recipeTitle={ drink.strDrink }
           index={ index }
         />
       ))}
      <Footer />
    </>
  );
}

export default Drinks;
