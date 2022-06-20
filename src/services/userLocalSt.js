const USER_TOKEN = 'user';

const readUser = () => localStorage.getItem(USER_TOKEN);
const saveUser = (email) => localStorage.setItem(USER_TOKEN, JSON.stringify(email));

export const updateUser = (email) => {
  saveUser({ email });
};

export const getUser = () => readUser();
