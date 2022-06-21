import { combineReducers } from 'redux';
import recipe from './recipeReducer';
import searchResults from './searchResultReducer';

const rootReducer = combineReducers({ searchResults, recipe });

export default rootReducer;
