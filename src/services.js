import { serverAddress } from './constants';

export async function fetchCourses() {
  const response = await fetch(`${serverAddress}/courses/all`);
  const responseJSON = await response.json();
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
