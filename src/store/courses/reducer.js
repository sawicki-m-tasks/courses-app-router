/* eslint-disable default-param-last */
import { v4 as uuidv4 } from 'uuid';
import generateCurrentDate from '../../helpers/dateGenerator';
import { coursesActions } from './actionTypes';

const generateId = () => uuidv4();

const initialState = [];
let flag = true;
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
      if (flag) {
        flag = false;
        return action.payload;
      }
      return state;
    }
    default:
      return state;
  }
}
