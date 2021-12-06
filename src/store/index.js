import { combineReducers, createStore } from 'redux';

import authorsReducer from './authors/reducer';
import usersReducer from './user/reducer';
import coursesReducer from './courses/reducer';

const store = createStore(
  combineReducers({
    authors: authorsReducer,
    user: usersReducer,
    courses: coursesReducer
  })
)

export default store;