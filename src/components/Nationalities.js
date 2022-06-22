import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getNationalities } from '../services/api';
import { fetchMealResults } from '../redux/actions';

function Nationalities() {
  const [nationalities, setNationalities] = useState([]);

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const categoriesList = async () => {
      const { meals } = await getNationalities(pathname);
      setNationalities(meals);
    };
    categoriesList();
  }, [pathname]);

  const handleClickNationality = ({ target: { value } }) => {
    console.log(value);
    switch (value) {
    case 'All':
      return dispatch(fetchMealResults('', ''));
    default:
      return dispatch(fetchMealResults(value, 'nationality'));
    }
  };

  return (
    <select
      data-testid="explore-by-nationality-dropdown"
      onClick={ handleClickNationality }
    >
      <option
        data-testid="All-option"
        type="button"
        value="All"
      >
        All
      </option>
      { nationalities.map((nationality) => (
        <option
          key={ nationality.strArea }
          data-testid={ `${nationality.strArea}-option` }
          type="button"
          value={ nationality.strArea }
        >
          {nationality.strArea}
        </option>
      ))}
    </select>
  );
}

export default Nationalities;
