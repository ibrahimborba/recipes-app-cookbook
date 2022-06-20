export const SET_USER = 'SET_USER';

export const saveUser = (email) => ({
  type: SET_USER,
  payload: email,
});
