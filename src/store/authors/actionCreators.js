import { authorsActions } from './actionTypes';

export const authorsFetched = data => ({
  type: authorsActions.authorsFetched,
  payload: data,
});

export const authorAdd = data => ({
  type: authorsActions.authorAdd,
  payload: data,
});
