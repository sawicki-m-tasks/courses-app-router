import 'regenerator-runtime/runtime';
import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from 'react-router';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockedStateCourses, mockedStoreCourses } from '../../../store/mockStore';
import CourseForm from '../CourseForm';
import { createAuthorThunk } from '../../../store/authors/thunk';
import { authorAdd } from '../../../store/authors/actionCreators';


test('CourseForm should display all available authors names', () => {
  render(
    <Provider store={mockedStoreCourses}>
      <MemoryRouter>
        <CourseForm/>
      </MemoryRouter>
    </Provider>
  );
  const displayedAuthorsIds = screen.getAllByTestId('courseAuthorAvailable').map(author => author.getAttribute('authorid'));
  const stateAuthors = mockedStateCourses.authors.map(author => author.id);
  expect(displayedAuthorsIds).toEqual(stateAuthors);
});

test('CourseForm with prefilled inputs should displays correctly authors', () => {
  render(
    <Provider store={mockedStoreCourses}>
      <MemoryRouter initialEntries={[`/courses/update/${mockedStateCourses.courses[0].id}`]}>
        <Routes>
          <Route path='/courses/update/:courseId' element={<CourseForm/>}/>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
  const selectedAuthors = screen.getAllByTestId('courseAuthorSelected');
  const availableAuthors = screen.getAllByTestId('courseAuthorAvailable');
  const selectedAuthorsIds = selectedAuthors.map(author => author.getAttribute('authorid'));
  const availableAuthorsIds = availableAuthors.map(author => author.getAttribute('authorid'));

  const stateAuthors = mockedStateCourses.authors;
  const stateCourses = mockedStateCourses.courses;

  const notSelectedAuthors = stateAuthors.filter(author => selectedAuthorsIds.indexOf(author.id) === -1);

  expect(selectedAuthors.length + availableAuthors.length).toEqual(stateAuthors.length);
  expect(selectedAuthorsIds).toEqual(stateCourses.map(course => course.authors).flat());
  
  expect(availableAuthorsIds).not.toEqual(selectedAuthorsIds);
  expect(availableAuthorsIds).toEqual(notSelectedAuthors.map(author => author.id));
});

test('Click on Create author button should call dispatch', () => {
  render(
    <Provider store={mockedStoreCourses}>
      <MemoryRouter initialEntries={[`/courses/update/${mockedStateCourses.courses[0].id}`]}>
        <Routes>
          <Route path='/courses/update/:courseId' element={<CourseForm/>}/>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
  userEvent.type(screen.getByLabelText('Author name'), 'karolek');
  userEvent.click(screen.getByText('Create author'));
  expect(mockedStoreCourses.dispatch).toHaveBeenCalledTimes(1);
});

test('Add author button click should add an author to course authors list', () => {
  render(
    <Provider store={mockedStoreCourses}>
      <MemoryRouter>
        <CourseForm/>
      </MemoryRouter>
    </Provider>
  );
  
  const firstToAdd = screen.getAllByTestId('courseAuthorAvailable')[0];

  expect(screen.queryAllByTestId('courseAuthorSelected')).toHaveLength(0);

  userEvent.click(firstToAdd.querySelector('button'));
  
  expect(screen.getAllByTestId('courseAuthorSelected')).toHaveLength(1);
  expect(screen.getByTestId('courseAuthorSelected').getAttribute('authorid')).toEqual(firstToAdd.getAttribute('authorid'));

});

test('Delete author button click should delete an author from the course list', () => {
  render(
    <Provider store={mockedStoreCourses}>
      <MemoryRouter>
        <CourseForm/>
      </MemoryRouter>
    </Provider>
  );

  const firstToAdd = screen.getAllByTestId('courseAuthorAvailable')[0];

  expect(screen.queryAllByTestId('courseAuthorSelected')).toHaveLength(0);

  userEvent.click(firstToAdd.querySelector('button'));

  expect(screen.getAllByTestId('courseAuthorSelected')).toHaveLength(1);
  expect(screen.getByTestId('courseAuthorSelected').getAttribute('authorid')).toEqual(firstToAdd.getAttribute('authorid'));

  userEvent.click(screen.getByText('Delete author'));

  expect(screen.queryAllByTestId('courseAuthorSelected')).toHaveLength(0);
  expect(screen.getAllByTestId('courseAuthorAvailable')).toHaveLength(mockedStateCourses.authors.length);
});
