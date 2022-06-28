import { DRINKS_INGREDIENTS_RESULTS, MEALS_INGREDIENTS_RESULTS } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
};

const ingredientsResults = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MEALS_INGREDIENTS_RESULTS:
    return { ...state, meals: [...action.payload] };
  case DRINKS_INGREDIENTS_RESULTS:
    return { ...state, drinks: [...action.payload] };
  default:
    return state;
  }
};

export default ingredientsResults;
