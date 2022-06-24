import meals from './meals';
import beefMeals from './beefMeals';
import oneMeal from './oneMeal';
import categoriesMeal from './categoriesMeal';

const fetch = (url) => Promise.resolve({
  json: () => {
    switch (url) {
    // Foods page fetch mocks
    case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
      return Promise.resolve(categoriesMeal);
    case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef':
      return Promise.resolve(beefMeals);
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Corba':
      return Promise.resolve(oneMeal);
    default:
      return Promise.resolve(meals);
    }
  },
});

export default fetch;
