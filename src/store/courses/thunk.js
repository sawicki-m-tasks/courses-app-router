import {
  addCourse,
  deleteCourse,
  fetchCourses,
  updateCourse,
} from '../../services';
import {
  courseAdd,
  courseDeleted,
  coursesFetched,
  courseUpdate,
} from './actionCreators';

export const createCourseThunk = (courseData, userToken, cb) => async dispatch => {
  const result = await addCourse(courseData, userToken);
  if (!result.successful) {
    alert('comething went wrong');
    return;
  }
  dispatch(courseAdd(result.result));
  cb();
};

export const updateCourseThunk = (courseData, courseId, userToken, cb) => async dispatch => {
  const result = await updateCourse(courseData, courseId, userToken);
  if (!result.successful) {
    alert('something went wrong');
    return;
  }
  dispatch(courseUpdate(result.result));
  cb();
};

export const deleteCourseThunk = (courseId, userToken) => async dispatch => {
  const result = await deleteCourse(courseId, userToken);
  if (!result.successful) {
    alert('something went wrong');
    return;
  }
  dispatch(courseDeleted(courseId));
};

export const fetchCoursesThunk = () => async dispatch => {
  const courses = await fetchCourses();
  if (!courses.successful) {
    alert('fetching courses went wrong');
    return;
  }
  dispatch(coursesFetched(courses.result));
};
