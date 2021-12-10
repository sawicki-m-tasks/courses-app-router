import React from "react";
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { mockedStoreCourses, mockedStoreUserAdmin, mockedStoreUserNotAdmin } from '../../../../../store/mockStore';
import CourseCard from '../CourseCard';
import formatDuration from '../../../../../helpers/pipeDuration';


jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

const course = {
  title: 'coursecard test title',
  duration: 30,
  creationDate: '9/3/2021',
  description: 'description',
  authors: [
    "9b87e8b8-6ba5-40fc-a439-c4e30a373d36"
  ]
}
const authors = {
  name: 'author',
  id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
};

test('CourseCard should display all course informations', () => {
  render(
    <Provider store={mockedStoreCourses}>
      <CourseCard
        key='0'
        id='0'
        title={course.title}
        duration={course.duration}
        creationDate={course.creationDate}
        description={course.description}
        authors={course.authors}
      />
    </Provider>
  );
  expect(screen.getByTestId('courseCardTitle').textContent).toEqual(course.title);
  expect(screen.getByTestId('courseCardDescription').textContent).toEqual(course.description);
  expect(screen.getByTestId('courseCardDuration').textContent).toEqual(`Duration:\xa0${formatDuration(course.duration)}\xa0hours`);
  expect(screen.getByTestId('courseCardAuthors').textContent).toEqual(`Authors:\xa0${authors.name}`);
  expect(screen.getByTestId('courseCardCreationDate').textContent).toEqual(`Created:\xa0${course.creationDate.replace(/\//g, '.')}`);
});

test('CourseCard should have additional buttons for admin user', () => {
  render(
    <Provider store={mockedStoreUserAdmin}>
      <CourseCard
        key='0'
        id='0'
        title={course.title}
        duration={course.duration}
        creationDate={course.creationDate}
        description={course.description}
        authors={course.authors}
      />
    </Provider>
  );
  expect(screen.getByTestId('courseCardUpdateButton')).toBeInTheDocument();
  expect(screen.getByTestId('courseCardDeleteButton')).toBeInTheDocument();
});

test('CourseCard should not have additional buttons for not admin', () => {
  render(
    <Provider store={mockedStoreUserNotAdmin}>
      <CourseCard
        key='0'
        id='0'
        title={course.title}
        duration={course.duration}
        creationDate={course.creationDate}
        description={course.description}
        authors={course.authors}
      />
    </Provider>
  );
  expect(screen.queryByTestId('courseCardUpdateButton')).not.toBeInTheDocument();
  expect(screen.queryByTestId('courseCardDeleteButton')).not.toBeInTheDocument();
});
