/* eslint-disable default-param-last */
import { authorsActions } from './actionTypes';

const initialState = null;

export default function authorsReducer(state = initialState, action) {
  switch (action.type) {
    case authorsActions.authorAdd: {
      return [...state, {
        name: action.payload.name,
        id: action.payload.id,
      }];
    }
    case authorsActions.authorsFetched: {
      return action.payload;
    }
    default:
      return state;
  }
}
