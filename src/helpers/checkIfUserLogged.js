import { localStorageKeys } from '../constants';

export default function checkIfUserLogged() {
  return localStorage.getItem(localStorageKeys.userName) !== null;
}
