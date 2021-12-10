import 'regenerator-runtime/runtime';
import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from 'react-router';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';
import { mockedStateCourses, mockedStoreCourses, mockedStoreNoCourses } from '../../../store/mockStore';

test('Courses component should displays correct number of courses', () => {
  render(
    <Provider store={mockedStoreCourses}>
      <MemoryRouter>
        <Courses/>
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getAllByTestId('courseCard')).toHaveLength(mockedStateCourses.courses.length);
});

test('Courses should go to CourseForm after clicking \'Add new course\' button', () => {
  render(
    <Provider store={mockedStoreCourses}>
      <MemoryRouter initialEntries={['/courses']}>
        <Routes>
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses/add' element={<CourseForm/>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText('Add new course')).toBeInTheDocument();
  userEvent.click(screen.getByText('Add new course'));
  expect(screen.getByTestId('courseForm')).toBeInTheDocument();
});

test('Courses component should display empty container for empty courses list', () => {
  render(
    <Provider store={mockedStoreNoCourses}>
      <MemoryRouter>
        <Courses />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.queryByTestId('courseCard')).not.toBeInTheDocument();
});
