/* eslint-disable default-param-last */
import { authorsActions } from './actionTypes';
import { generateId } from '../../helpers/idGenerator';

const initialState = null;

export default function authorsReducer(state = initialState, action) {
  switch (action.type) {
    case authorsActions.authorAdd: {
      const id = generateId();
      return [...state, {
        name: action.payload,
        id,
      }];
    }
    case authorsActions.authorsFetched: {
      return action.payload;
    }
    default:
      return state;
  }
}
