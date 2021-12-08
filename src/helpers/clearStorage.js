/* eslint-disable no-restricted-syntax */
import { localStorageKeys } from '../constants';

export const clearStorage = () => {
  for (const key of Object.values(localStorageKeys)) {
    localStorage.removeItem(key);
  }
};
