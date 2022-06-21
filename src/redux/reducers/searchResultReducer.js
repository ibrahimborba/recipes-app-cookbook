import { MEAL_RESULTS, DRINK_RESULTS } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
};

const searchResults = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MEAL_RESULTS:
    return { ...state, meals: [...action.payload] };
  case DRINK_RESULTS:
    return { ...state, drinks: [...action.payload] };
  default:
    return state;
  }
};

export default searchResults;
