import { combineReducers } from 'redux';
import recipe from './recipeReducer';
import searchResults from './searchResultReducer';
import randomResults from './randomReducer';
import ingredientsResults from './ingredientsReducer';
import searchOptions from './searchOptionsReducer';
import categories from './categoryReducer';
import nationalities from './nationalityReducer';

const rootReducer = combineReducers({
  searchResults,
  randomResults,
  ingredientsResults,
  searchOptions,
  recipe,
  categories,
  nationalities,
});

export default rootReducer;
