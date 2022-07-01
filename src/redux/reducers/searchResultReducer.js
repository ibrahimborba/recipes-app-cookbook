import { MEAL_RESULTS, DRINK_RESULTS,
  IS_FETCHING, REQUISITION_FAILED, TURN_OFF_FETCHING } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  isFetching: false,
  error: null,
};

const searchResults = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, isFetching: true };

  case MEAL_RESULTS:
    return { ...state, meals: [...action.payload], isFetching: false };

  case DRINK_RESULTS:
    return { ...state, drinks: [...action.payload], isFetching: false };

  case REQUISITION_FAILED:
    return {
      ...state, error: action.payload.error.message, isFetching: false };

  case TURN_OFF_FETCHING:
    return { ...state, isFetching: false };

  default:
    return state;
  }
};

export default searchResults;
