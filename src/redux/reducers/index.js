import { combineReducers } from 'redux';
import searchResults from './searchResultReducer';
import randomResults from './randomReducer';
import ingredientsResults from './ingredientsReducer';
import searchOptions from './searchOptionsReducer';

const rootReducer = combineReducers({
  searchResults,
  randomResults,
  ingredientsResults,
  searchOptions,
});

export default rootReducer;
