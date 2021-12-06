import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import authorsReducer from './authors/reducer';
import usersReducer from './user/reducer';
import coursesReducer from './courses/reducer';

const store = createStore(
  combineReducers({
    authors: authorsReducer,
    user: usersReducer,
    courses: coursesReducer
  }),
  composeWithDevTools()
)

export default store;