import {
  getDrink, getMeal, getRandom,
  getIngredients, getRecipe, getRecommendations,
} from '../../services/api';

export const MEAL_RESULTS = 'MEAL_RESULTS';
export const DRINK_RESULTS = 'DRINK_RESULTS';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const IS_FETCHING = 'IS_FETCHING';
export const REQUISITION_FAILED = 'REQUISITION_FAILED';
export const GET_RECIPE_SUCCEEDED = 'GET_RECIPE_SUCCEEDED';
export const GET_RECOMMENDATIONS_SUCCEEDED = 'GET_RECOMMENDATIONS_SUCCEEDED';
export const RANDOM_MEAL_RESULTS = 'RANDOM_MEAL_RESULTS';
export const RANDOM_DRINK_RESULTS = 'RANDOM_DRINK_RESULTS';
export const MEALS_INGREDIENTS_RESULTS = 'MEALS_INGREDIENTS_RESULTS';
export const DRINKS_INGREDIENTS_RESULTS = 'DRINKS_INGREDIENTS_RESULTS';
export const SEARCH_OPTION = 'SEARCH_OPTION';
export const IS_IN_PROGRESS = 'IS_IN_PROGRESS';
export const FINISH_BUTTON_STATUS = 'FINISH_BUTTON_STATUS';
export const TURN_OFF_FETCHING = 'TURN_OFF_FETCHING';

const isFetching = () => ({
  type: IS_FETCHING,
});

const endFetching = () => ({
  type: TURN_OFF_FETCHING,
});

const requisitonSucceeded = (data, type) => ({
  type,
  payload: { data },
});

const requisitionFailed = (error) => ({
  type: REQUISITION_FAILED,
  payload: { error },
});

export const mealResults = (results) => ({
  type: MEAL_RESULTS,
  payload: [...results],
});

export const fetchMealResults = (search, option) => async (dispatch) => {
  dispatch(isFetching());
  try {
    const { meals } = await getMeal(search, option);
    if (!meals) {
      dispatch(endFetching());
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    dispatch(mealResults(meals));
  } catch (error) {
    dispatch(requisitionFailed(error));
  }
};

export const drinkResults = (results) => ({
  type: DRINK_RESULTS,
  payload: [...results],
});

export const fetchDrinkResults = (search, option) => async (dispatch) => {
  dispatch(isFetching());
  try {
    const { drinks } = await getDrink(search, option);
    if (!drinks) {
      dispatch(endFetching());
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    dispatch(drinkResults(drinks));
  } catch (error) {
    dispatch(requisitionFailed(error));
  }
};

const formatIngredients = (recipe) => {
  const NUMBER_OF_INGREDIENTS = 15;
  let ingredients = [];

  for (let i = 1; i <= NUMBER_OF_INGREDIENTS; i += 1) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    const isNull = !ingredient && !measure;
    const isEmpty = (ingredient === '' && measure === '')
      || (ingredient === ' ' || measure === ' ');

    if (!isNull && !isEmpty) {
      const ingredientStr = ingredient ? ingredient.trim() : ingredient;
      const measureStr = measure ? measure.trim() : measure;
      ingredients = [...ingredients, [ingredientStr, measureStr]];
    }
  }

  return ingredients;
};

const formatData = (data, option) => {
  const [recipe] = [...Object.values(data)][0];
  const ingredients = formatIngredients(recipe);
  let recipeObj = {};

  if (option === 'food') {
    const {
      idMeal, strCategory, strMeal, strInstructions, strYoutube, strMealThumb,
      strArea, strTags,
    } = recipe;

    recipeObj = {
      alcoholic: '',
      categoryRecom: strCategory,
      category: strCategory,
      group: 'meals',
      id: idMeal,
      image: strMealThumb,
      ingredients,
      instructions: strInstructions.split('\r\n'),
      nationality: strArea,
      tags: strTags ? strTags.split(',') : [],
      title: strMeal,
      type: 'food',
      video: strYoutube,
    };
  }

  if (option === 'drink') {
    const {
      idDrink, strDrink, strInstructions, strDrinkThumb, strAlcoholic, strCategory,
    } = recipe;

    recipeObj = {
      alcoholic: strAlcoholic,
      categoryRecom: strAlcoholic,
      category: strCategory,
      group: 'cocktails',
      id: idDrink,
      image: strDrinkThumb,
      ingredients,
      instructions: strInstructions.split('\r\n'),
      nationality: '',
      tags: [],
      title: strDrink,
      type: 'drink',
      video: '',
    };
  }

  return recipeObj;
};

export const fetchRecipeThunk = (id, option) => async (dispatch) => {
  dispatch(isFetching());

  try {
    const data = await getRecipe(id, option);
    const recipe = formatData(data, option);

    dispatch(requisitonSucceeded(recipe, GET_RECIPE_SUCCEEDED));
  } catch (error) {
    dispatch(requisitionFailed(error));
  }
};

export const getRecommendationsThunk = (option) => async (dispatch) => {
  dispatch(isFetching());

  try {
    const data = await getRecommendations(option);

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

export const randomMealResults = (results) => ({
  type: RANDOM_MEAL_RESULTS,
  payload: [...results],
});

export const fetchRandomMealResults = (pathname) => async (dispatch) => {
  const { meals } = await getRandom(pathname);
  dispatch(randomMealResults(meals));
};

export const randomDrinkResults = (results) => ({
  type: RANDOM_DRINK_RESULTS,
  payload: [...results],
});

export const fetchRandomDrinkResults = (pathname) => async (dispatch) => {
  const { drinks } = await getRandom(pathname);
  dispatch(randomDrinkResults(drinks));
};

export const mealsIngredientsResults = (results) => ({
  type: MEALS_INGREDIENTS_RESULTS,
  payload: [...results],
});

export const fetchMealsIngredientsResults = (pathname) => async (dispatch) => {
  dispatch(isFetching());
  try {
    const { meals } = await getIngredients(pathname);
    dispatch(mealsIngredientsResults(meals));
  } catch (error) {
    dispatch(requisitionFailed(error));
  }
};

export const drinksIngredientsResults = (results) => ({
  type: DRINKS_INGREDIENTS_RESULTS,
  payload: [...results],
});

export const fetchDrinksIngredientsResults = (pathname) => async (dispatch) => {
  dispatch(isFetching());
  try {
    const { drinks } = await getIngredients(pathname);
    dispatch(drinksIngredientsResults(drinks));
  } catch (error) {
    dispatch(requisitionFailed(error));
  }
};

export const searchOptions = (search = '', option = '') => ({
  type: SEARCH_OPTION,
  payload: {
    search,
    option,
  },
});

export const updateToInProgress = (status) => ({
  type: IS_IN_PROGRESS,
  payload: { status },
});

export const updateFinishButtonStatus = (status) => ({
  type: FINISH_BUTTON_STATUS,
  payload: { status },
});
