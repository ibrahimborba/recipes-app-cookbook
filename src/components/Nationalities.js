import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMealResults } from '../redux/actions';
import { fetchNationalityResults } from '../redux/actions/optionsAction';
import StyledNationalities from '../styled/StyledNationalities';

function Nationalities() {
  const dispatch = useDispatch();
  const { nationalities, isFetching } = useSelector((state) => state.nationalities);

  useEffect(() => {
    dispatch(fetchNationalityResults());
  }, [dispatch]);

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
      {
        !isFetching
        && (
          <select
            className="select-nationalities"
            data-testid="explore-by-nationality-dropdown"
            onClick={ handleClickNationality }
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
        )
      }
    </StyledNationalities>
  );
}

export default Nationalities;
