import { userActions } from './actionTypes';

/* eslint-disable default-param-last */
const initialState = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.userLogout: {
      return {
        isAuth: false,
        name: '',
        email: '',
        token: '',
      };
    }
    case userActions.userLogin: {
      return {
        isAuth: true,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    }
    default:
      return state;
  }
}
