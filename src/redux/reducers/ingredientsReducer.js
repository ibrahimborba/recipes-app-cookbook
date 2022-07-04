import { DRINKS_INGREDIENTS_RESULTS, MEALS_INGREDIENTS_RESULTS,
  IS_FETCHING, REQUISITION_FAILED } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  isFetching: false,
  error: null,
};

const ingredientsResults = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, isFetching: true };

  case MEALS_INGREDIENTS_RESULTS:
    return { ...state, meals: [...action.payload], isFetching: false };

  case DRINKS_INGREDIENTS_RESULTS:
    return { ...state, drinks: [...action.payload], isFetching: false };

  case REQUISITION_FAILED:
    return {
      ...state, error: action.payload.error.message, isFetching: false };

  default:
    return state;
  }
};

export default ingredientsResults;
