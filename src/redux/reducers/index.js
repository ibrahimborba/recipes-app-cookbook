import { combineReducers } from 'redux';
import searchResults from './searchResultReducer';

const rootReducer = combineReducers({ searchResults });

export default rootReducer;
