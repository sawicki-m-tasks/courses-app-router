import { userActions } from './actionTypes';

/* eslint-disable default-param-last */
const initialState = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
  role: '',
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.userSetRole: {
      return {
        ...state,
        role: action.payload,
      };
    }
    case userActions.userLogout: {
      return {
        isAuth: false,
        name: '',
        email: '',
        token: '',
        role: '',
      };
    }
    case userActions.userLogin: {
      return {
        isAuth: true,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        role: action.payload.role,
      };
    }
    default:
      return state;
  }
}
