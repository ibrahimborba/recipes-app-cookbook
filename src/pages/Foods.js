import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesOptions from '../components/CategoriesOptions';
import CardRecipe from '../components/CardRecipe';
import { fetchMealResults } from '../redux/actions';
import StyledCardGrid from '../styled/StyledCardGrid';
import Loading from '../components/Loading';

function Foods() {
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.searchResults);
  const { search, option } = useSelector((state) => state.searchOptions);
  const { isFetching } = useSelector((state) => state.searchResults);

  const MAX_ITEMS_DISPLAY = 12;

  useEffect(() => {
    dispatch(fetchMealResults(search, option));
  }, [dispatch, search, option]);

  return (
    <>
      <Header enableSearch />
      <CategoriesOptions />
      { isFetching
        ? <Loading />
        : (
          <StyledCardGrid>
            { meals.length > 0
                && meals.slice(0, MAX_ITEMS_DISPLAY).map((meal, index) => (
                  <CardRecipe
                    key={ meal.idMeal }
                    id={ meal.idMeal }
                    image={ meal.strMealThumb }
                    title={ meal.strMeal }
                    index={ index }
                    type="food"
                  />
                ))}
          </StyledCardGrid>
        ) }
      <Footer />
    </>
  );
}

export default Foods;
