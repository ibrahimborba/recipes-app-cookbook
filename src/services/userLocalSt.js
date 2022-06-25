const USER_TOKEN = 'user';
const INITIAL_VALUE = { email: '' };

if (!localStorage.getItem(USER_TOKEN)) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(INITIAL_VALUE));
}

const readUser = () => JSON.parse(localStorage.getItem(USER_TOKEN));
const saveUser = (email) => localStorage.setItem(USER_TOKEN, JSON.stringify(email));

export const updateUser = (email) => {
  saveUser({ email });
};

export const getUser = () => readUser();

export const logout = () => localStorage.clear();
