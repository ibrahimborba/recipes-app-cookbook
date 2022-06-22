import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCategories } from '../services/api';
import { fetchMealResults, fetchDrinkResults } from '../redux/actions';

function CategoriesOptions() {
  const [categories, setCategories] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState('');

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const MAX_ITEMS_DISPLAY = 5;

  useEffect(() => {
    const categoriesList = async () => {
      const categoriesResult = await getCategories(pathname);
      setCategories(categoriesResult);
    };
    categoriesList();
  }, [pathname]);

  const handleClickCategory = ({ target: { value, name } }) => {
    switch (pathname) {
    case '/foods':
      if (value === checkedCategory || name === 'All') {
        dispatch(fetchMealResults('', ''));
        return setCheckedCategory('');
      }
      dispatch(fetchMealResults(value, 'category'));
      return setCheckedCategory(value);

    case '/drinks':
      if (value === checkedCategory || name === 'All') {
        dispatch(fetchDrinkResults('', ''));
        return setCheckedCategory('');
      }
      dispatch(fetchDrinkResults(value, 'category'));
      return setCheckedCategory(value);
    default:
      break;
    }
  };

  return (
    <section>
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ handleClickCategory }
        name="All"
      >
        All
      </button>
      { categories.slice(0, MAX_ITEMS_DISPLAY).map((category) => (
        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          type="button"
          value={ category.strCategory }
          onClick={ handleClickCategory }
        >
          {category.strCategory}
        </button>
      ))}
    </section>
  );
}

export default CategoriesOptions;
