/* eslint-disable no-alert */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { inputText, buttonText } from '../../constants';
import { performRegistration } from '../../services';

import './Registration.css';

export default function Registration() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();

  const handleNameInput = e => {
    setUserName(e.target.value);
  };

  const handleEmailInput = e => {
    setUserEmail(e.target.value);
  };

  const handlePasswordInput = e => {
    setUserPassword(e.target.value);
  };

  const handleRegistration = e => {
    e.preventDefault();
    performRegistration(userName, userEmail, userPassword)
      .then(data => {
        if (!data.successful) {
          alert(data.errors.join('\n'));
          return;
        }
        navigate('/login');
      })
      .catch(err => {
        alert(`something went wront\n${err.message}`);
      });
  };

  return (
    <section className='registration'>
      <h1>Registration</h1>
      <form onSubmit={handleRegistration}>
        <Input type='text' id='userName' value={userName} onChange={handleNameInput} labelText={inputText.registrationName.label} placeholderText={inputText.registrationName.placeholder} />
        <Input type='email' id='userEmail' value={userEmail} onChange={handleEmailInput} labelText={inputText.registrationEmail.label} placeholderText={inputText.registrationEmail.placeholder} />
        <Input type='password' id='userPassword' value={userPassword} onChange={handlePasswordInput} labelText={inputText.registrationPassword.label} placeholderText={inputText.loginPassword.placeholder} />
        <Button type='submit' buttonText={buttonText.register} />
      </form>
      <span>
        If you have an account, you can&nbsp;
        <Link to='/login'>login</Link>
      </span>
    </section>
  );
}
