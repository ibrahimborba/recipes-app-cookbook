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
    return false;
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
    return false;
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
