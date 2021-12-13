import '@testing-library/jest-dom';

import coursesReducer from '../../store/courses/reducer';
import { coursesActions } from '../courses/actionTypes';

test('reducer should return the initial state', () => {
  expect(coursesReducer(undefined, {})).toBeNull();
});

test('Should return new course after adding it to empty state', () => {
  const newCourseData = {
    id: '0',
    title: 'test title',
    description: 'test description',
    creationDate: '10/10/10',
    duration: 60,
    authors: ['fouhfo824t'],
  }

  expect(coursesReducer([], {type: coursesActions.courseAdd, payload: newCourseData})).toEqual([
    {
      id: '0',
      title: 'test title',
      description: 'test description',
      creationDate: '10/10/10',
      duration: 60,
      authors: ['fouhfo824t'],
    }
  ]);
});

test('Should return updated state after adding new course', () => {
  const initialState = [{
    id: '0',
    title: 'test title',
    description: 'test description',
    creationDate: '10/10/10',
    duration: 60,
    authors: ['fouhfo824t'],
  }];

  const newCourseData = {
    id: '1',
    title: 'halko centralko',
    description: 'test description blabla',
    creationDate: '12/12/20',
    duration: 123,
    authors: ['fouhfo824t', 'adfadfda', 'adgf2g'],
  }

  expect(coursesReducer(initialState, {type: coursesActions.courseAdd, payload: newCourseData})).toEqual([
    {
      id: '0',
      title: 'test title',
      description: 'test description',
      creationDate: '10/10/10',
      duration: 60,
      authors: ['fouhfo824t'],
    },
    {
      id: '1',
      title: 'halko centralko',
      description: 'test description blabla',
      creationDate: '12/12/20',
      duration: 123,
      authors: ['fouhfo824t', 'adfadfda', 'adgf2g'],
    }
  ]);
});

test('Should return input data after initial setup', () => {
  const fetchedData = [{
    id: '1',
    title: 'halko centralko',
    description: 'test description blabla',
    creationDate: '12/12/20',
    duration: 123,
    authors: ['fouhfo824t', 'adfadfda', 'adgf2g'],
  }];

  expect(coursesReducer(null, {type: coursesActions.coursesFetched, payload: fetchedData})).toEqual([
    {
      id: '1',
      title: 'halko centralko',
      description: 'test description blabla',
      creationDate: '12/12/20',
      duration: 123,
      authors: ['fouhfo824t', 'adfadfda', 'adgf2g'],
    }
  ])
});
