export const getMeal = async (search, option) => {
  let URL = '';
  switch (option) {
  case 'ingredient':
    URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
    break;
  case 'name':
    URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    break;
  case 'first-letter':
    URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
    break;
  case 'category':
    URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
    break;
  case 'nationality':
    URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
    break;
  default:
    URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
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
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    break;
  case 'first-letter':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
    break;
  case 'category':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    break;
  default:
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
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

export const getNationalities = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  try {
    const apiResponse = await fetch(URL);
    const apiResult = await apiResponse.json();
    return apiResult;
  } catch (error) {
    return error;
  }
};
