import { getDrink, getMeal } from '../../services/api';

export const SET_USER = 'SET_USER';
export const MEAL_RESULTS = 'MEAL_RESULTS';
export const DRINK_RESULTS = 'DRINK_RESULTS';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const IS_FETCHING = 'IS_FETCHING';
export const REQUISITION_SUCCEEDED = 'REQUISITION_SUCCEEDED';
export const REQUISITION_FAILED = 'REQUISITION_FAILED';

export const saveUser = (email) => ({
  type: SET_USER,
  payload: email,
});

export const mealResults = (results) => ({
  type: MEAL_RESULTS,
  payload: [...results],
});

export const fetchMealResults = (search, option) => async (dispatch) => {
  const { meals } = await getMeal(search, option);
  console.log(meals);
  console.log(meals);
  if (!meals) {
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  dispatch(mealResults(meals));
};

export const drinkResults = (results) => ({
  type: DRINK_RESULTS,
  payload: [...results],
});

export const fetchDrinkResults = (search, option) => async (dispatch) => {
  const { drinks } = await getDrink(search, option);
  if (!drinks) {
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  dispatch(drinkResults(drinks));
};

const isFetching = () => ({
  type: IS_FETCHING,
});

const requisitionSucceeded = (data) => ({
  type: REQUISITION_SUCCEEDED,
  payload: {
    data,
  },
});

const requisitionFailed = (error) => ({
  type: REQUISITION_FAILED,
  payload: {
    error,
  },
});

const getIngredients = (recipe) => {
  const NUMBER_OF_INGREDIENTS = 15;
  let ingredients = [];

  for (let i = 1; i <= NUMBER_OF_INGREDIENTS; i += 1) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    const isNull = !ingredient && !measure;
    const isEmpty = ingredient === '' && measure === '';

    if (!isNull && !isEmpty) ingredients = [...ingredients, [ingredient, measure]];
  }

  return {
    type: GET_INGREDIENTS,
    ingredients,
  };
};

export const fetchRecipeThunk = (id, option) => async (dispatch) => {
  dispatch(isFetching());

  let url = '';

  switch (option) {
  case 'food':
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    break;

  case 'drink':
    url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    break;

  default:
    return false;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    let recipe = {};

    switch (option) {
    case 'food':
      recipe = { ...data.meals[0] };
      break;

    case 'drink':
      recipe = { ...data.drinks[0] };
      break;
    default:
      break;
    }

    dispatch(getIngredients(recipe));
    dispatch(requisitionSucceeded(recipe));
  } catch (error) {
    dispatch(requisitionFailed(error));
  }
};
