import { SEARCH_OPTION } from '../actions';

const INITIAL_STATE = {
  search: '',
  option: '',
};

const searchOptions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_OPTION:
    return { ...action.payload };
  default:
    return state;
  }
};

export default searchOptions;
