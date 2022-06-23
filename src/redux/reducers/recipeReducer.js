import {
  GET_INGREDIENTS, GET_RECIPE_SUCCEEDED,
  GET_RECOMMENDATIONS_SUCCEEDED, IS_FETCHING, IS_IN_PROGRESS, REQUISITION_FAILED,
} from '../actions';

const INITIAL_VALUE = {
  currentRecipe: {
    id: '',
    category: '',
    title: '',
    instructions: '',
    video: '',
    image: '',
    ingredients: [],
  },
  recommendations: [],
  isFetching: false,
  error: null,
  inProgress: false,
};

const recipe = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case IS_FETCHING:
    return {
      ...state,
      isFetching: true,
    };

  case REQUISITION_FAILED:
    return {
      ...state,
      error: action.payload.error.message,
      isFetching: false,
    };

  case GET_RECIPE_SUCCEEDED:
    return {
      ...state,
      currentRecipe: { ...action.payload.data },
      isFetching: false,
    };

  case GET_RECOMMENDATIONS_SUCCEEDED:
    return {
      ...state,
      recommendations: [...action.payload.data],
      isFetching: false,
    };

  case GET_INGREDIENTS:
    return {
      ...state,
      ingredients: [...action.ingredients],
    };

  case IS_IN_PROGRESS:
    return {
      ...state,
      inProgress: true,
    };

  default:
    return state;
  }
};

export default recipe;
