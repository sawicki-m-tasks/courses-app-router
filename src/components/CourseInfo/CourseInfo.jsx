import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import formatDuration from '../../helpers/pipeDuration';

import './CourseInfo.css';

export default function CourseInfo() {
  const { courseId } = useParams();
  const course = useSelector(state => (
    state.courses.find(stateCourse => stateCourse.id === courseId)
  ));
  const authors = useSelector(state => (
    state.authors.filter(author => course.authors.indexOf(author.id) !== -1)
  ));

  return (
    <section className='courseInfo'>
      <Link to='/courses' className='backToCourses'>Back to courses</Link>
      <h1>{course.title}</h1>
      <div className='courseInfoBottom'>
        <div className='courseInfoDescription'>
          <p>{course.description}</p>
        </div>
        <div className='courseInfoDetails'>
          <ul>
            <li>
              <b>ID:&nbsp;</b>
              {course.id}
            </li>
            <li>
              <b>Duration:&nbsp;</b>
              {formatDuration(course.duration)}
              &nbsp;hours
            </li>
            <li>
              <b>Created:&nbsp;</b>
              {course.creationDate}
            </li>
            <li>
              <b>Authors:&nbsp;</b>
              {authors.map(author => author.name).join(', ')}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
