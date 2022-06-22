import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinksIngredientsResults } from '../redux/actions';

function DrinksIngredients() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const MAX_INGREDIENTS_DISPLAY = 12;
  const drinksIngredientsResults = useSelector((state) => state
    .ingredientsResults.drinks);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDrinksIngredientsResults(pathname));
    };
    fetchData();
  }, [pathname, dispatch]);

  return (
    <>
      <Header />
      {drinksIngredientsResults.slice(0, MAX_INGREDIENTS_DISPLAY).map((ing, index) => (
        <div
          key={ ing.strIngredient1 }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Small.png` }
            alt={ ing.strIngredient1 }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ ing.strIngredient1 }</p>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default DrinksIngredients;
