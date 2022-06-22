const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const DONE_RECIPES_TOKEN = 'doneRecipes';

if (!localStorage.getItem(DONE_RECIPES_TOKEN)) {
  localStorage.setItem(DONE_RECIPES_TOKEN, JSON.stringify([]));
}

const readDoneRecipes = () => JSON.parse(localStorage.getItem(DONE_RECIPES_TOKEN));
const saveDoneRecipes = (recipes) => localStorage.setItem(DONE_RECIPES_TOKEN, recipes);

export const updateRecipesDone = (recipe) => {
  const recipesDone = readDoneRecipes();

  saveDoneRecipes([...recipesDone, recipe]);
};

export const getRecipesDone = () => readDoneRecipes();

const saveTokenMeals = () => {
  localStorage.setItem(MEALS_TOKEN, '1');
  localStorage.setItem(COCKTAILS_TOKEN, '1');
};

export default saveTokenMeals;
