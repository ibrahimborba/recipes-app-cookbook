import { CATEGORY_RESULTS, IS_FETCHING_CAT } from '../actions/categoryAction';

const INITIAL_STATE = {
  categories: [],
  isFetching: false,
};

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING_CAT:
    return { ...state, isFetching: true };

  case CATEGORY_RESULTS:
    return { ...state, categories: [...action.payload], isFetching: false };

  default:
    return state;
  }
};

export default categories;
