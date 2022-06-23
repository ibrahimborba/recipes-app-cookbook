const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const DONE_RECIPES_TOKEN = 'doneRecipes';
const IN_PROGRESS_RECIPE_TOKEN = 'inProgressRecipes';
const FAVORITE_RECIPES_TOKEN = 'favoriteRecipes';

const DONE_MOCK = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

if (!localStorage.getItem(DONE_RECIPES_TOKEN)) {
  localStorage.setItem(DONE_RECIPES_TOKEN, JSON.stringify(DONE_MOCK));
}

if (!localStorage.getItem(IN_PROGRESS_RECIPE_TOKEN)) {
  localStorage.setItem(
    IN_PROGRESS_RECIPE_TOKEN,
    JSON.stringify({ cocktails: {}, meals: {} }),
  );
}

if (!localStorage.getItem(FAVORITE_RECIPES_TOKEN)) {
  localStorage.setItem(
    FAVORITE_RECIPES_TOKEN,
    JSON.stringify([]),
  );
}

const readDoneRecipes = () => JSON.parse(localStorage.getItem(DONE_RECIPES_TOKEN));
const saveDoneRecipes = (recipes) => localStorage.setItem(DONE_RECIPES_TOKEN, recipes);
const readInProgressRecipes = () => {
  const data = localStorage.getItem(IN_PROGRESS_RECIPE_TOKEN);

  return JSON.parse(data);
};
const saveInProgressRecipes = (recipes) => {
  localStorage.setItem(IN_PROGRESS_RECIPE_TOKEN, JSON.stringify(recipes));
};
const readFavoriteRecipes = () => {
  const data = localStorage.getItem(FAVORITE_RECIPES_TOKEN);

  return JSON.parse(data);
};
const saveFavoriteRecipes = (recipes) => {
  localStorage.setItem(FAVORITE_RECIPES_TOKEN, JSON.stringify(recipes));
};

export const updateFavoriteRecipes = (recipe) => {
  const favoriteRecipes = readFavoriteRecipes();
  const hasRecipe = favoriteRecipes.some(({ id }) => id === recipe.id);

  if (hasRecipe) {
    const favoritesWithoutRecipe = favoriteRecipes.filter(({ id }) => id !== recipe.id);

    saveFavoriteRecipes([...favoritesWithoutRecipe]);
  } else {
    saveFavoriteRecipes([...favoriteRecipes, { ...recipe }]);
  }
};

export const getFavoriteRecipes = () => readFavoriteRecipes();

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
