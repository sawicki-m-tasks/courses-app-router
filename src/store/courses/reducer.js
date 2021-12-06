/* eslint-disable default-param-last */
import generateCurrentDate from '../../helpers/dateGenerator';
import { coursesActions } from './actionTypes';
import { generateId } from '../../helpers/idGenerator';

const initialState = null;

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case coursesActions.courseAdd: {
      return [...state, {
        id: generateId(),
        title: action.payload.title,
        description: action.payload.description,
        creationDate: generateCurrentDate(),
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
