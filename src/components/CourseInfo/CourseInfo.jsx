import { Link, useParams } from 'react-router-dom';

import getCourseInfo from '../../helpers/getCourseInfo';

import './CourseInfo.css';

export default function CourseInfo() {
  const { courseId } = useParams();
  const course = getCourseInfo(courseId);

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
              <b>ID:</b>
              {course.id}
            </li>
            <li>
              <b>Duration:</b>
              {course.duration}
            </li>
            <li>
              <b>Created: </b>
              {course.creationDate}
            </li>
            <li>
              <b>Authors:</b>
              {course.authors.join(', ')}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
