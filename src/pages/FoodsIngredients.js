import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMealsIngredientsResults, searchOptions } from '../redux/actions';
import StyledIngredients from '../styled/StyledIngredients';

function FoodsIngredients() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const MAX_INGREDIENTS_DISPLAY = 12;
  const { meals } = useSelector((state) => state.ingredientsResults);

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
      <StyledIngredients>
        {meals.slice(0, MAX_INGREDIENTS_DISPLAY).map((ing, index) => (
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
      </StyledIngredients>
      <Footer />
    </>
  );
}

export default FoodsIngredients;
