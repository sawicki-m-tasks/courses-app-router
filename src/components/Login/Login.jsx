/* eslint-disable no-alert */
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react/cjs/react.development';
import { AuthContext } from '../../auth/AuthContext';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import {
  inputText,
  buttonText,
  localStorageKeys,
  serverAddress,
} from '../../constants';

import './Login.css';

async function performLogin(userEmail, userPassword) {
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

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();
  const loginContext = useContext(AuthContext);

  const saveToStorage = (userName, token) => {
    localStorage.setItem(localStorageKeys.userName, userName);
    localStorage.setItem(localStorageKeys.token, token);
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const result = await performLogin(userEmail, userPassword);
      if (!result.successful) {
        alert(result.result);
        return;
      }
      saveToStorage(result.user.name, result.result);
      loginContext.setLoginStatus(true);
      navigate('/courses');
    } catch (err) {
      alert(`something went wrong\n${err.message}`);
    }
  };

  const handleEmailInput = e => {
    setUserEmail(e.target.value);
  };

  const handlePasswordInput = e => {
    setUserPassword(e.target.value);
  };

  return (
    <section className='login'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <Input type='email' id='userEmail' value={userEmail} onChange={handleEmailInput} labelText={inputText.loginEmail.label} placeholderText={inputText.loginEmail.placeholder} />
        <Input type='password' id='userPassword' value={userPassword} onChange={handlePasswordInput} labelText={inputText.loginPassword.label} placeholderText={inputText.loginPassword.placeholder} />
        <Button type='submit' buttonText={buttonText.login} />
      </form>
      <span>
        If you do not have an account, you can&nbsp;
        <Link to='/registration'>register</Link>
      </span>
    </section>
  );
}
