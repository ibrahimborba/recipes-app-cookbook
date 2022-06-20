const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';

const saveTokenMeals = () => {
  localStorage.setItem(MEALS_TOKEN, '1');
  localStorage.setItem(COCKTAILS_TOKEN, '1');
};

export default saveTokenMeals;
