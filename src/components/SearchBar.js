import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from './Input';
import { fetchMealResults, fetchDrinkResults } from '../redux/actions';
import StyledSearchBar from '../styled/StyledSearchBar';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [checkedOption, setCheckedOption] = useState('');
  const [fetched, setFetched] = useState(false);

  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const mealResults = useSelector((state) => state.searchResults.meals);
  const drinkResults = useSelector((state) => state.searchResults.drinks);

  const handleSearchText = ({ target: { value } }) => {
    setSearchText(value);
  };

  const handleOptions = ({ target: { value } }) => {
    setCheckedOption(value);
  };

  const checkSearchResult = useCallback((results) => {
    if (results.length === 1) {
      return pathname === '/foods'
        ? history.push(`/foods/${results[0].idMeal}`)
        : history.push(`/drinks/${results[0].idDrink}`);
    }
  }, [history, pathname]);

  useEffect(() => {
    if (fetched) {
      switch (pathname) {
      case '/drinks': {
        return checkSearchResult(drinkResults);
      }
      default: {
        return checkSearchResult(mealResults);
      }
      }
    }
  }, [fetched, checkSearchResult, mealResults, drinkResults, pathname]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (checkedOption === 'first-letter' && searchText.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }

    switch (pathname) {
    case '/drinks': {
      await dispatch(fetchDrinkResults(searchText, checkedOption));
      return setFetched(true);
    }
    default: {
      await dispatch(fetchMealResults(searchText, checkedOption));
      return setFetched(true);
    }
    }
  };

  return (
    <StyledSearchBar onSubmit={ handleSubmit }>
      <Input
        id="text-search"
        dataTestId="search-input"
        type="text"
        value={ searchText }
        frontLabel="Search"
        onChange={ handleSearchText }
        placeholder="Type your search..."
      />
      <section>
        <Input
          backLabel="Ingredient"
          id="ingredient-search"
          dataTestId="ingredient-search-radio"
          type="radio"
          value="ingredient"
          onChange={ handleOptions }
          checked={ checkedOption === 'ingredient' }
        />
        <Input
          backLabel="Name"
          id="name-search"
          dataTestId="name-search-radio"
          type="radio"
          value="name"
          onChange={ handleOptions }
          checked={ checkedOption === 'name' }
        />
        <Input
          backLabel="First Letter"
          id="first-letter-search"
          dataTestId="first-letter-search-radio"
          type="radio"
          value="first-letter"
          onChange={ handleOptions }
          checked={ checkedOption === 'first-letter' }
        />
      </section>
      <button
        className="btn_search"
        data-testid="exec-search-btn"
        type="submit"
      >
        Search
      </button>
    </StyledSearchBar>
  );
}

export default SearchBar;
