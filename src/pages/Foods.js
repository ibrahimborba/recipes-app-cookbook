import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesOptions from '../components/CategoriesOptions';
import CardRecipe from '../components/CardRecipe';
import { fetchMealResults } from '../redux/actions';
import StyledCardGrid from '../styled/StyledCardGrid';

function Foods() {
  const dispatch = useDispatch();
  const mealResults = useSelector((state) => state.searchResults.meals);
  const { search, option } = useSelector((state) => state.searchOptions);

  const MAX_ITEMS_DISPLAY = 12;

  useEffect(() => {
    const getResults = async () => {
      await dispatch(fetchMealResults(search, option));
    };
    getResults();
  }, [dispatch, search, option]);

  return (
    <>
      <Header enableSearch />
      <CategoriesOptions />
      <StyledCardGrid>
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
      </StyledCardGrid>
      <Footer />
    </>
  );
}

export default Foods;
