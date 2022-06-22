const MEALS_END_POINT_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_END_POINT_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const getMeal = async (search, option) => {
  let URL = '';
  switch (option) {
  case 'ingredient':
    URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
    break;
  case 'name':
    URL = MEALS_END_POINT_BY_NAME;
    break;
  case 'first-letter':
    URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
    break;
  case 'category':
    URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
    break;
  default:
    URL = MEALS_END_POINT_BY_NAME;
  }

  try {
    const apiResponse = await fetch(`${URL}${search}`);
    const apiResult = await apiResponse.json();
    return apiResult;
  } catch (error) {
    return error;
  }
};

export const getDrink = async (search, option) => {
  let URL = '';
  switch (option) {
  case 'ingredient':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    break;
  case 'name':
    URL = DRINKS_END_POINT_BY_NAME;
    break;
  case 'first-letter':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
    break;
  case 'category':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    break;
  default:
    URL = DRINKS_END_POINT_BY_NAME;
  }

  try {
    const apiResponse = await fetch(`${URL}${search}`);
    const apiResult = await apiResponse.json();
    return apiResult;
  } catch (error) {
    return error;
  }
};

export const getRandom = async (pathname) => {
  let URL = '';
  switch (pathname) {
  case '/explore/foods':
    URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    break;
  case '/explore/drinks':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    break;
  default:
    return false;
  }

  try {
    const apiResponse = await fetch(URL);
    const apiResult = await apiResponse.json();
    return apiResult;
  } catch (error) {
    return error;
  }
};

export const getIngredients = async (pathname) => {
  let URL = '';
  switch (pathname) {
  case '/explore/foods/ingredients':
    URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    break;
  case '/explore/drinks/ingredients':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    break;
  default:
    return false;
  }
  try {
    const apiResponse = await fetch(URL);
    const apiResult = await apiResponse.json();
    return apiResult;
  } catch (error) {
    return error;
  }
};

export const getCategories = async (pathname) => {
  let URL = '';
  let key = '';
  switch (pathname) {
  case '/foods':
    URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    key = 'meals';
    break;
  case '/drinks':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    key = 'drinks';
    break;
  default:
    break;
  }

  try {
    const apiResponse = await fetch(URL);
    const apiResult = await apiResponse.json();
    const categoriesList = apiResult[key];
    return categoriesList;
  } catch (error) {
    return error;
  }
};

export const getRecipe = async (id, option) => {
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

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getRecommendations = async (option) => {
  let url = '';

  switch (option) {
  case 'food':
    url = MEALS_END_POINT_BY_NAME;
    break;

  case 'drink':
    url = DRINKS_END_POINT_BY_NAME;
    break;

  default:
    return false;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
};
