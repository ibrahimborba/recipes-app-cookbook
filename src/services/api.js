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
    if (search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
    break;
  default:
    return false;
  }

  try {
    const apiResponse = await fetch(`${URL}${search}`);
    const apiResult = await apiResponse.json();
    console.log(apiResult);
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
    if (search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
    break;
  default:
    return false;
  }

  try {
    const apiResponse = await fetch(`${URL}${search}`);
    const apiResult = await apiResponse.json();
    console.log(apiResult);
    return apiResult;
  } catch (error) {
    return error;
  }
};
