import { serverAddress } from './constants';

export async function fetchCourses() {
  const response = await fetch(`${serverAddress}/courses/all`);
  const responseJSON = await response.json();
  // responseJSON.duration = responseJSON.duration.toString();
  return responseJSON;
}

export async function fetchAuthors() {
  const response = await fetch(`${serverAddress}/authors/all`);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function performLogin(userEmail, userPassword) {
  const loginData = {
    name: null,
    email: userEmail,
    password: userPassword,
  };

  const response = await fetch(`${serverAddress}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const responseJSON = await response.json();
  return responseJSON;
}

export async function performRegistration(userName, userEmail, userPassword) {
  const registrationData = {
    name: userName,
    email: userEmail,
    password: userPassword,
  };

  const response = await fetch(`${serverAddress}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationData),
  });
  const responseJSON = await response.json();
  return responseJSON;
}

export async function performLogout(token) {
  const response = await fetch(`${serverAddress}/logout`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  });
  return response;
}

export async function getUserRole(token) {
  const response = await fetch(`${serverAddress}/users/me`, {
    headers: {
      Authorization: token,
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
}

export async function addAuthor(author, token) {
  console.log('author: ', author);
  console.log('token: ', token);
  const authorData = {
    name: author,
  };
  const response = await fetch(`${serverAddress}/authors/add`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authorData),
  });
  const responseJSON = await response.json();
  return responseJSON;
}

export async function addCourse(data, token) {
  const response = await fetch(`${serverAddress}/courses/add`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseJSON = await response.json();
  return responseJSON;
}

export async function updateCourse(data, courseId, token) {
  const response = await fetch(`${serverAddress}/courses/${courseId}`, {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseJSON = await response.json();
  return responseJSON;
}

export async function deleteCourse(courseId, token) {
  const response = await fetch(`${serverAddress}/courses/${courseId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
}
