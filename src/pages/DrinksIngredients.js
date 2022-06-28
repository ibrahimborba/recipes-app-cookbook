import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinksIngredientsResults, searchOptions } from '../redux/actions';

function DrinksIngredients() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const MAX_INGREDIENTS_DISPLAY = 12;
  const drinksIngredientsResults = useSelector((state) => state
    .ingredientsResults.drinks);

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
      {drinksIngredientsResults.slice(0, MAX_INGREDIENTS_DISPLAY).map((ing, index) => (
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
      <Footer />
    </>
  );
}

export default DrinksIngredients;
