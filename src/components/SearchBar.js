import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import { fetchMealResults, fetchDrinkResults } from '../redux/actions';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [checkedOption, setCheckedOption] = useState('');
  const [fetched, setFetched] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const mealResults = useSelector((state) => state.searchResults.meals);
  const drinkResults = useSelector((state) => state.searchResults.drinks);

  const handleSearchText = ({ target: { value } }) => {
    setSearchText(value);
  };

  const handleOptions = ({ target: { value } }) => {
    setCheckedOption(value);
  };

  const checkSearchResult = useCallback((results) => {
    /* if (results.length === 0) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } */
    if (results.length === 1) {
      return pathname === '/foods'
        ? history.push(`/foods/${results[0].idMeal}`)
        : history.push(`/drinks/${results[0].idDrink}`);
    }
  }, [history, pathname]);

  useEffect(() => {
    if (fetched) {
      switch (pathname) {
      case '/foods': {
        checkSearchResult(mealResults);
        break;
      }
      case '/drinks': {
        checkSearchResult(drinkResults);
        break;
      }
      default:
        return false;
      }
    }
  }, [fetched]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (checkedOption === 'first-letter' && searchText.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }

    switch (pathname) {
    case '/foods': {
      await dispatch(fetchMealResults(searchText, checkedOption));
      setFetched(true);
      break;
    }
    case '/drinks': {
      await dispatch(fetchDrinkResults(searchText, checkedOption));
      setFetched(true);
      break;
    }
    default:
      return false;
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <Input
        id="text-search"
        dataTestId="search-input"
        type="text"
        value={ searchText }
        onChange={ handleSearchText }
      />
      <Input
        label="Ingredient"
        id="ingredient-search"
        dataTestId="ingredient-search-radio"
        type="radio"
        value="ingredient"
        onChange={ handleOptions }
        checked={ checkedOption === 'ingredient' }
      />
      <Input
        label="Name"
        id="name-search"
        dataTestId="name-search-radio"
        type="radio"
        value="name"
        onChange={ handleOptions }
        checked={ checkedOption === 'name' }
      />
      <Input
        label="First Letter"
        id="first-letter-search"
        dataTestId="first-letter-search-radio"
        type="radio"
        value="first-letter"
        onChange={ handleOptions }
        checked={ checkedOption === 'first-letter' }
      />
      <button
        data-testid="exec-search-btn"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
