import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesOptions from '../components/CategoriesOptions';
import CardRecipe from '../components/CardRecipe';
import { fetchDrinkResults } from '../redux/actions';
import StyledCardGrid from '../styled/StyledCardGrid';
import Loading from '../components/Loading';

function Drinks() {
  const dispatch = useDispatch();
  const { drinks } = useSelector((state) => state.searchResults);
  const { search, option } = useSelector((state) => state.searchOptions);
  const { isFetching } = useSelector((state) => state.searchResults);

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
      { isFetching
        ? <Loading />
        : (
          <StyledCardGrid>
            { drinks.length > 0
              && drinks.slice(0, MAX_ITEMS_DISPLAY).map((drink, index) => (
                <CardRecipe
                  key={ drink.idDrink }
                  id={ drink.idDrink }
                  image={ drink.strDrinkThumb }
                  title={ drink.strDrink }
                  index={ index }
                  type="drink"
                />
              ))}
          </StyledCardGrid>
        )}
      <Footer />
    </>
  );
}

export default Drinks;
