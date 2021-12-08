/* eslint-disable default-param-last */
import { coursesActions } from './actionTypes';

const initialState = null;

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case coursesActions.courseUpdate: {
      return state.map(el => {
        if (el.id === action.payload.id) {
          return action.payload;
        }
        return el;
      });
    }
    case coursesActions.courseAdd: {
      return [...state, {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        creationDate: action.payload.creationDate,
        duration: action.payload.duration,
        authors: action.payload.authors,
      }];
    }
    case coursesActions.courseDeleted: {
      return state.filter(course => course.id !== action.payload);
    }
    case coursesActions.coursesFetched: {
      return action.payload;
    }
    default:
      return state;
  }
}
