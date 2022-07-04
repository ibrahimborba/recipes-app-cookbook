import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMealResults, fetchDrinkResults } from '../redux/actions/index';
import StyledCategories from '../styled/StyledCategories';
import { fetchCategoryResults } from '../redux/actions/categoryAction';

function CategoriesOptions() {
  const [checkedCategory, setCheckedCategory] = useState('');
  const { categories, isFetching } = useSelector((state) => state.categories);

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const MAX_ITEMS_DISPLAY = 5;

  useEffect(() => {
    dispatch(fetchCategoryResults(pathname));
  }, [dispatch, pathname]);

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
      {
        !isFetching
        && (
          <>
            <button
              className={ checkedCategory === '' && 'selectedCategory' }
              data-testid="All-category-filter"
              type="button"
              onClick={ handleClickCategory }
              name="All"
              value="All"
            >
              All
            </button>
            { categories.slice(0, MAX_ITEMS_DISPLAY).map((category) => (
              <button
                className={
                  checkedCategory === category.strCategory && 'selectedCategory'
                }
                key={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
                type="button"
                value={ category.strCategory }
                onClick={ handleClickCategory }
              >
                { editString(category.strCategory)}
              </button>
            ))}
          </>
        )
      }
    </StyledCategories>
  );
}

export default CategoriesOptions;
