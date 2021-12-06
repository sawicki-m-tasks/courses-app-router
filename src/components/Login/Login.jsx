/* eslint-disable no-alert */
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import {
  inputText,
  buttonText,
  localStorageKeys,
} from '../../constants';
import { userLogin } from '../../store/user/actionCreators';
import { performLogin } from '../../services';

import './Login.css';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveToStorage = (userName, email, token) => {
    localStorage.setItem(localStorageKeys.userName, userName);
    localStorage.setItem(localStorageKeys.userEmail, email);
    localStorage.setItem(localStorageKeys.token, token);
  };

  const handleLogin = e => {
    e.preventDefault();
    performLogin(userEmail, userPassword)
      .then(data => {
        if (!data.successful) {
          alert(data.result);
          return;
        }
        saveToStorage(data.user.name, data.user.email, data.result);
        dispatch(userLogin({
          name: data.user.name,
          email: data.user.email,
          token: data.result,
        }));
        navigate('/courses');
      }).catch(err => {
        alert(`something went wrong\n${err.message}`);
      });
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
