import { userActions } from './actionTypes';

export const userLogin = data => ({
  type: userActions.userLogin,
  payload: data,
});

export const userLogout = () => ({
  type: userActions.userLogout,
});
