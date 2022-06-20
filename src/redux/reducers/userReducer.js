import { SET_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
