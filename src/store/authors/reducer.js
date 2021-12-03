/* eslint-disable default-param-last */
import { v4 as uuidv4 } from 'uuid';
import { authorsActions } from './actionTypes';

const initialState = [];

const generateId = () => uuidv4();

export default function authorsReducer(state = initialState, action) {
  switch (action.type) {
    case authorsActions.authorAdd: {
      const id = generateId();
      console.log('add author: ', [...state, {
        name: action.payload,
        id,
      }]);
      return [...state, {
        name: action.payload,
        id,
      }];
    }
    case authorsActions.authorsFetched: {
      console.log(action);
      return action.payload;
    }
    default:
      return state;
  }
}
