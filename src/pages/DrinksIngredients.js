import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinksIngredientsResults, searchOptions } from '../redux/actions';
import StyledIngredients from '../styled/StyledIngredients';
import Loading from '../components/Loading';

function DrinksIngredients() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const { drinks } = useSelector((state) => state
    .ingredientsResults);
  const { isFetching } = useSelector((state) => state.ingredientsResults);

  const MAX_INGREDIENTS_DISPLAY = 12;
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDrinksIngredientsResults(pathname));
    };
    fetchData();
  }, [pathname, dispatch]);

  const handleClick = (value) => () => {
    dispatch(searchOptions(value, 'ingredient'));
    history.push('/drinks');
  };

  return (
    <>
      <Header />
      { isFetching
        ? <Loading />
        : (
          <StyledIngredients>
            {drinks.slice(0, MAX_INGREDIENTS_DISPLAY).map((ing, index) => (
              <button
                key={ ing.strIngredient1 }
                data-testid={ `${index}-ingredient-card` }
                type="button"
                onClick={ handleClick(ing.strIngredient1) }
              >
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Small.png` }
                  alt={ ing.strIngredient1 }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ ing.strIngredient1 }</p>
              </button>
            ))}
          </StyledIngredients>
        )}
      <Footer />
    </>
  );
}

export default DrinksIngredients;
