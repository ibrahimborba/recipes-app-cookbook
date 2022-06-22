import { combineReducers } from 'redux';
import recipe from './recipeReducer';
import searchResults from './searchResultReducer';
import randomResults from './randomReducer';
import ingredientsResults from './ingredientsReducer';

const rootReducer = combineReducers({
  searchResults, recipe, randomResults, ingredientsResults,
});

export default rootReducer;
