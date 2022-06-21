import {
  GET_INGREDIENTS, IS_FETCHING, REQUISITION_FAILED, REQUISITION_SUCCEEDED,
} from '../actions';

const INITIAL_VALUE = {
  recipeReceived: {},
  ingredients: [],
  isFetching: false,
  error: null,
  inProgress: true,
};

const recipe = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case IS_FETCHING:
    return {
      ...state,
      isFetching: true,
    };

  case REQUISITION_SUCCEEDED:
    return {
      ...state,
      recipeReceived: { ...action.payload.data },
      isFetching: false,
    };

  case REQUISITION_FAILED:
    return {
      ...state,
      error: { ...action.payload.error },
      isFetching: false,
    };

  case GET_INGREDIENTS:
    return {
      ...state,
      ingredients: [...action.ingredients],
    };

  default:
    return state;
  }
};

export default recipe;
