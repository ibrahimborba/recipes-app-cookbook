import { combineReducers } from 'redux';
import searchResults from './searchResultReducer';
import randomResults from './randomReducer';

const rootReducer = combineReducers({ searchResults, randomResults });

export default rootReducer;
