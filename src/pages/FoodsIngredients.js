import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMealsIngredientsResults } from '../redux/actions';

function FoodsIngredients() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const MAX_INGREDIENTS_DISPLAY = 12;
  const mealIngredientsResults = useSelector((state) => state.ingredientsResults.meals);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchMealsIngredientsResults(pathname));
    };
    fetchData();
  }, [pathname, dispatch]);

  return (
    <>
      <Header />
      {mealIngredientsResults.slice(0, MAX_INGREDIENTS_DISPLAY).map((ing, index) => (
        <div
          key={ ing.idIngredient }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png` }
            alt={ ing.strIngredient }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ ing.strIngredient }</p>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default FoodsIngredients;
