/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Courses.css';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import formatDuration from '../../helpers/pipeDuration';
import { buttonText } from '../../constants';
import { fetchCourses, fetchAuthors } from '../../services';
import { coursesFetched } from '../../store/courses/actionCreators';
import { authorsFetched } from '../../store/authors/actionCreators';

export default function Courses() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coursesList = useSelector(state => state.courses);
  const authorsList = useSelector(state => state.authors);

  useEffect(() => {
    async function getData() {
      console.log('courses fetch');
      if (!authorsList) {
        const a = await fetchAuthors();
        dispatch(authorsFetched(a.result));
      }
      if (!coursesList) {
        const c = await fetchCourses();
        dispatch(coursesFetched(c.result));
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
        <div className='newCourseContainer'>
          <Button buttonText={buttonText.addNewCourse} onClick={newCourseHandler} />
        </div>
      </section>
      <section className='coursesSection'>
        <div className='coursesListContainer'>
          {
            coursesList && coursesList.map(course => {
              if (course.title.toLowerCase().includes(searchPhrase) || course.id.toLowerCase().includes(searchPhrase)) {
                const duration = formatDuration(course.duration);
                const authors = course.authors.map(id => authorsList.find(author => author.id === id).name);
                return (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    duration={duration}
                    creationDate={course.creationDate}
                    description={course.description}
                    authors={authors}
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
