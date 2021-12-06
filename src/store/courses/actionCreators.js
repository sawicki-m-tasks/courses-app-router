import { coursesActions } from './actionTypes';

export const coursesFetched = data => ({
  type: coursesActions.coursesFetched,
  payload: data,
});

export const courseDeleted = id => ({
  type: coursesActions.courseDeleted,
  payload: id,
});

export const courseAdd = data => ({
  type: coursesActions.courseAdd,
  payload: data,
});
