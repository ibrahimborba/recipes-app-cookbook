import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesOptions from '../components/CategoriesOptions';
import CardRecipe from '../components/CardRecipe';
import { fetchDrinkResults } from '../redux/actions';
import StyledCardGrid from '../styled/StyledCardGrid';

function Drinks() {
  const dispatch = useDispatch();
  const drinkResults = useSelector((state) => state.searchResults.drinks);
  const { search, option } = useSelector((state) => state.searchOptions);

  const MAX_ITEMS_DISPLAY = 12;

  useEffect(() => {
    const getResults = async () => {
      await dispatch(fetchDrinkResults(search, option));
    };
    getResults();
  }, [dispatch, search, option]);

  return (
    <>
      <Header enableSearch />
      <CategoriesOptions />
      <StyledCardGrid>
        { drinkResults.length > 0
       && drinkResults.slice(0, MAX_ITEMS_DISPLAY).map((drink, index) => (
         <CardRecipe
           key={ drink.idDrink }
           recipeID={ drink.idDrink }
           recipeImg={ drink.strDrinkThumb }
           recipeTitle={ drink.strDrink }
           index={ index }
         />
       ))}
      </StyledCardGrid>
      <Footer />
    </>
  );
}

export default Drinks;
