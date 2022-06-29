import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getNationalities } from '../services/api';
import { fetchMealResults } from '../redux/actions';
import StyledNationalities from '../styled/StyledNationalities';

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
    switch (value) {
    case 'All':
      return dispatch(fetchMealResults('', ''));
    default:
      return dispatch(fetchMealResults(value, 'nationality'));
    }
  };

  return (
    <StyledNationalities>
      <select
        className="select-nationalities"
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleClickNationality }
      >
        <option
          className="select-nationalities-option"
          data-testid="All-option"
          type="button"
          value="All"
        >
          All
        </option>
        { nationalities.map((nationality) => (
          <option
            className="select-nationalities-option"
            key={ nationality.strArea }
            data-testid={ `${nationality.strArea}-option` }
            type="button"
            value={ nationality.strArea }
          >
            {nationality.strArea}
          </option>
        ))}
      </select>
    </StyledNationalities>
  );
}

export default Nationalities;
