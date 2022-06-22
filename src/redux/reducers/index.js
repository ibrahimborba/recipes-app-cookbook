import { combineReducers } from 'redux';
import recipe from './recipeReducer';
import searchResults from './searchResultReducer';
import randomResults from './randomReducer';
import ingredientsResults from './ingredientsReducer';

<<<<<<< HEAD
const rootReducer = combineReducers({ searchResults, recipe });
=======
const rootReducer = combineReducers({ searchResults, randomResults, ingredientsResults });
>>>>>>> 4eeb0aacc3abfbab7089d2b3999d4f752153a17a

export default rootReducer;
