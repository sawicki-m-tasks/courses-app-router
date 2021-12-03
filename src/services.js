import { serverAddress } from './constants';

export async function fetchCourses() {
  const response = await fetch(`${serverAddress}/courses/all`);
  const responseJSON = await response.json();
  console.log('service: ', responseJSON);
  return responseJSON;
}

export async function fetchAuthors() {
  const response = await fetch(`${serverAddress}/authors/all`);
  const responseJSON = await response.json();
  console.log('service: ', responseJSON);
  return responseJSON;
}
