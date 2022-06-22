import { combineReducers } from 'redux';
import searchResults from './searchResultReducer';
import randomResults from './randomReducer';
import ingredientsResults from './ingredientsReducer';

const rootReducer = combineReducers({ searchResults, randomResults, ingredientsResults });

export default rootReducer;
