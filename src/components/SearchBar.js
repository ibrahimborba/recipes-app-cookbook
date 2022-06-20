import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Input from './Input';
import { getDrink, getMeal } from '../services/api';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [checkedOption, setCheckedOption] = useState('');
  const { pathname } = useLocation();

  const handleSearchText = ({ target: { value } }) => {
    setSearchText(value);
  };

  const handleOptions = ({ target: { value } }) => {
    setCheckedOption(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    switch (pathname) {
    case '/foods': {
      const { meals } = await getMeal(searchText, checkedOption);
      console.log(meals);
      break;
    }
    case '/drinks': {
      const { drinks } = await getDrink(searchText, checkedOption);
      console.log(drinks);
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
