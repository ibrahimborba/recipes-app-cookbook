import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCategories } from '../services/api';
import { fetchMealResults, fetchDrinkResults } from '../redux/actions';
import StyledCategories from '../styled/StyledCategories';

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
    case '/drinks':
      if (value === checkedCategory || name === 'All') {
        dispatch(fetchDrinkResults('', ''));
        return setCheckedCategory('');
      }
      dispatch(fetchDrinkResults(value, 'category'));
      return setCheckedCategory(value);
    default:
      if (value === checkedCategory || name === 'All') {
        dispatch(fetchMealResults('', ''));
        return setCheckedCategory('');
      }
      dispatch(fetchMealResults(value, 'category'));
      return setCheckedCategory(value);
    }
  };

  const editString = (string) => {
    if (string.includes('/')) {
      return string.split('/')[0];
    }
    return string;
  };

  return (
    <StyledCategories>
      <button
        className={ checkedCategory === '' ? 'selectedCategory' : '' }
        data-testid="All-category-filter"
        type="button"
        onClick={ handleClickCategory }
        name="All"
      >
        All
      </button>
      { categories.slice(0, MAX_ITEMS_DISPLAY).map((category) => (
        <button
          className={ checkedCategory === category.strCategory ? 'selectedCategory' : '' }
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          type="button"
          value={ category.strCategory }
          onClick={ handleClickCategory }
        >
          { editString(category.strCategory)}
        </button>
      ))}
    </StyledCategories>
  );
}

export default CategoriesOptions;
