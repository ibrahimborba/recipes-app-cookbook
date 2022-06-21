import { getDrink, getMeal, getRandom } from '../../services/api';

export const SET_USER = 'SET_USER';
export const MEAL_RESULTS = 'MEAL_RESULTS';
export const DRINK_RESULTS = 'DRINK_RESULTS';
export const RANDOM_MEAL_RESULTS = 'RANDOM_MEAL_RESULTS';
export const RANDOM_DRINK_RESULTS = 'RANDOM_DRINK_RESULTS';

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
