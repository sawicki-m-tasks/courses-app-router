import { mockedCoursesList, mockedAuthorsList } from '../constants';
import formatDuration from './pipeDuration';

export default function getCourseInfo(courseId) {
  const course = mockedCoursesList.find(courseElem => courseElem.id === courseId);
  const authors = mockedAuthorsList.filter(author => course.authors.indexOf(author.id) !== -1);
  const authorsNames = authors.map(author => author.name);
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    duration: formatDuration(course.duration),
    authors: authorsNames,
    creationDate: course.creationDate.replaceAll('/', '.'),
  };
}
