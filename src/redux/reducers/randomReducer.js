import { RANDOM_MEAL_RESULTS, RANDOM_DRINK_RESULTS } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
};

const randomResults = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RANDOM_MEAL_RESULTS:
    return { ...state, meals: [...action.payload] };
  case RANDOM_DRINK_RESULTS:
    return { ...state, drinks: [...action.payload] };
  default:
    return state;
  }
};

export default randomResults;
