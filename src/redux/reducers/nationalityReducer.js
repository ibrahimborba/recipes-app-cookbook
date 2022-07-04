import { NATIONALITY_RESULTS, IS_FETCHING_OPTIONS } from '../actions/optionsAction';

const INITIAL_STATE = {
  nationalities: [],
  isFetching: false,
};

const nationalities = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING_OPTIONS:
    return { ...state, isFetching: true };

  case NATIONALITY_RESULTS:
    return { ...state, nationalities: [...action.payload], isFetching: false };

  default:
    return state;
  }
};

export default nationalities;
