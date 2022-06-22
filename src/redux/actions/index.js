import { getDrink, getMeal } from '../../services/api';

export const SET_USER = 'SET_USER';
export const MEAL_RESULTS = 'MEAL_RESULTS';
export const DRINK_RESULTS = 'DRINK_RESULTS';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const IS_FETCHING = 'IS_FETCHING';
export const REQUISITION_FAILED = 'REQUISITION_FAILED';
export const GET_RECIPE_SUCCEEDED = 'GET_RECIPE_SUCCEEDED';
export const GET_RECOMMENDATIONS_SUCCEEDED = 'GET_RECOMMENDATIONS_SUCCEEDED';

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

const requisitonSucceeded = (data, type) => ({
  type,
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

  return ingredients;
};

const formatData = (data, option) => {
  const [recipe] = [...Object.values(data)][0];
  const ingredients = getIngredients(recipe);
  let recipeObj = {};

  switch (option) {
  case 'food': {
    const {
      idMeal, strCategory, strMeal, strInstructions, strYoutube, strMealThumb,
    } = recipe;

    recipeObj = {
      id: idMeal,
      category: strCategory,
      title: strMeal,
      instructions: strInstructions,
      video: strYoutube,
      image: strMealThumb,
      ingredients,
    };
    break;
  }
  case 'drink': {
    const {
      idDrink, strDrink, strInstructions, strDrinkThumb, strAlcoholic,
    } = recipe;

    recipeObj = {
      id: idDrink,
      category: strAlcoholic,
      title: strDrink,
      instructions: strInstructions,
      image: strDrinkThumb,
      ingredients,
    };
    break;
  }

  default:
    break;
  }

  return recipeObj;
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
    const recipe = formatData(data, option);

    dispatch(requisitonSucceeded(recipe, GET_RECIPE_SUCCEEDED));
  } catch (error) {
    dispatch(requisitionFailed(error));
  }
};

export const getRecommendationsThunk = (option) => async (dispatch) => {
  dispatch(isFetching());

  let url = '';

  switch (option) {
  case 'food':
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    break;

  case 'drink':
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    break;

  default:
    return false;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    const NUMBER_OF_RECOMMENDARIONS = 6;
    const recommendations = Object
      .values(data)[0]
      .slice(0, NUMBER_OF_RECOMMENDARIONS)
      .map((recipe) => formatData({ recipes: [recipe] }, option));

    dispatch(requisitonSucceeded(recommendations, GET_RECOMMENDATIONS_SUCCEEDED));
  } catch (error) {
    dispatch(requisitionFailed(error));
  }
};
