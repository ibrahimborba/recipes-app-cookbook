import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMealsIngredientsResults, searchOptions } from '../redux/actions';

function FoodsIngredients() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const MAX_INGREDIENTS_DISPLAY = 12;
  const mealIngredientsResults = useSelector((state) => state.ingredientsResults.meals);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchMealsIngredientsResults(pathname));
    };
    fetchData();
  }, [pathname, dispatch]);

  const handleClick = (value) => () => {
    dispatch(searchOptions(value, 'ingredient'));
    history.push('/foods');
  };

  return (
    <>
      <Header />
      {mealIngredientsResults.slice(0, MAX_INGREDIENTS_DISPLAY).map((ing, index) => (
        <button
          key={ ing.idIngredient }
          data-testid={ `${index}-ingredient-card` }
          type="button"
          onClick={ handleClick(ing.strIngredient) }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png` }
            alt={ ing.strIngredient }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { ing.strIngredient }
          </p>
        </button>
      ))}
      <Footer />
    </>
  );
}

export default FoodsIngredients;
