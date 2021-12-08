import { localStorageKeys } from '../constants';

export const saveUserToStorage = (userName, email, token) => {
  localStorage.setItem(localStorageKeys.userName, userName || '');
  localStorage.setItem(localStorageKeys.userEmail, email);
  localStorage.setItem(localStorageKeys.token, token);
};

export const saveRoleToStorage = role => {
  localStorage.setItem(localStorageKeys.role, role);
};
