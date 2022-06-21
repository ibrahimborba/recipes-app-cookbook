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
