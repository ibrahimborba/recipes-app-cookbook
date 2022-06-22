const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const DONE_RECIPES_TOKEN = 'doneRecipes';
const IN_PROGRESS_RECIPE_TOKEN = 'inProgressRecipes';

if (!localStorage.getItem(DONE_RECIPES_TOKEN)) {
  localStorage.setItem(DONE_RECIPES_TOKEN, JSON.stringify([]));
}

if (!localStorage.getItem(IN_PROGRESS_RECIPE_TOKEN)) {
  localStorage.setItem(
    IN_PROGRESS_RECIPE_TOKEN,
    JSON.stringify({ cocktails: {}, meals: {} }),
  );
}

const readDoneRecipes = () => JSON.parse(localStorage.getItem(DONE_RECIPES_TOKEN));
const saveDoneRecipes = (recipes) => localStorage.setItem(DONE_RECIPES_TOKEN, recipes);
const readInProgressRecipes = () => {
  const data = localStorage.getItem(IN_PROGRESS_RECIPE_TOKEN);

  return JSON.parse(data);
};
const saveInProgressRecipes = (recipes) => {
  localStorage.setItem(IN_PROGRESS_RECIPE_TOKEN, recipes);
};

export const updateInProgressRecipes = (recipe) => {
  const recipesInProgress = readInProgressRecipes();
  const recipes = {
    ...recipesInProgress,
    recipe,
  };

  saveInProgressRecipes(recipes);
};

export const getInProgressRecipes = () => readInProgressRecipes();

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
