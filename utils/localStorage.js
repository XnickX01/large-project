// utils/localStorage.js
import Cookies from 'js-cookie';

export const setLocalStorage = (key, value) => {
  Cookies.set(key, value);
};

export const getLocalStorage = (key) => {
  return Cookies.get(key);
};
