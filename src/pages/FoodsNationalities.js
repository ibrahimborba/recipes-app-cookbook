import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMealResults } from '../redux/actions';
import Nationalities from '../components/Nationalities';
import CardRecipe from '../components/CardRecipe';
import StyledCardGrid from '../styled/StyledCardGrid';
import Loading from '../components/Loading';

function FoodsNationalities() {
  const dispatch = useDispatch();
  const { isFetching, meals: mealResults } = useSelector((state) => state.searchResults);
  const searchOptions = useSelector((state) => state.searchOptions);

  const MAX_ITEMS_DISPLAY = 12;

  useEffect(() => {
    const { search, option } = searchOptions;
    dispatch(fetchMealResults(search, option));
  }, [dispatch, searchOptions]);

  return (
    <>
      <Header enableSearch />
      <Nationalities />
      {
        isFetching
          ? <Loading />
          : (
            <StyledCardGrid>
              { mealResults.length > 0
                && mealResults.slice(0, MAX_ITEMS_DISPLAY).map((meal, index) => (
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
          )
      }
      <Footer />
    </>
  );
}

export default FoodsNationalities;
