/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import {
  inputText,
  buttonText,
} from '../../constants';

import { userLoginThunk } from '../../store/user/thunk';

import './Login.css';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async e => {
    e.preventDefault();
    dispatch(userLoginThunk([userEmail, userPassword]));
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
