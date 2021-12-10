/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Courses.css';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import { buttonText } from '../../constants';
import { fetchAuthorsThunk } from '../../store/authors/thunk';
import { fetchCoursesThunk } from '../../store/courses/thunk';

export default function Courses() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coursesList = useSelector(state => state.courses);
  const authorsList = useSelector(state => state.authors);
  const user = useSelector(state => state.user);

  useEffect(() => {
    async function getData() {
      if (!authorsList) {
        dispatch(fetchAuthorsThunk());
      }
      if (!coursesList) {
        dispatch(fetchCoursesThunk());
      }
    }
    getData();
  }, []);

  const handleSearchInput = e => {
    setInputValue(e.target.value);
    if (e.target.value === '') {
      setSearchPhrase('');
    }
  };

  const search = () => {
    setSearchPhrase(inputValue.toLowerCase());
  };

  const newCourseHandler = () => {
    navigate('/courses/add');
  };

  return (
    <div className='coursesContainer'>
      <section className='upperSection'>
        <div className='searchBarContainer'>
          <SearchBar inputValue={inputValue} onSearch={search} onChange={handleSearchInput} />
        </div>
        {user.role === 'admin'
          && (
          <div className='newCourseContainer'>
            <Button data_testid='coursesCreateNewCourseButton' buttonText={buttonText.addNewCourse} onClick={newCourseHandler} />
          </div>
          )}
      </section>
      <section className='coursesSection'>
        <div className='coursesListContainer'>
          {
            coursesList && coursesList.map(course => {
              if (course.title.toLowerCase().includes(searchPhrase) || course.id.toLowerCase().includes(searchPhrase)) {
                return (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    duration={course.duration}
                    creationDate={course.creationDate}
                    description={course.description}
                    authors={course.authors}
                  />
                );
              }
            })
          }
        </div>
      </section>
    </div>
  );
}
