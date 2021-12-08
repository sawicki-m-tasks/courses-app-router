/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from 'react';
import {
  Outlet,
  useNavigate,
} from 'react-router';
import { AuthContext } from '../../auth/AuthContext';
import Button from '../../common/Button/Button';
import { buttonText, localStorageKeys } from '../../constants';
import Logo from './components/Logo/Logo';

import './Header.css';

export default function Header() {
  const userName = localStorage.getItem(localStorageKeys.userName) || '';
  const navigate = useNavigate();
  const loginContext = useContext(AuthContext);

  const handleLogout = () => {
    for (const key of Object.values(localStorageKeys)) {
      localStorage.removeItem(key);
    }
    loginContext.setLoginStatus(false);
    navigate('/login');
  };

  return (
    <>
      <header>
        <div className='logo'>
          <Logo />
        </div>
        {loginContext.loginStatus
        && (
        <div className='accountDetails'>
          <span>{userName}</span>
          <Button buttonText={buttonText.logout} onClick={handleLogout} />
        </div>
        )}
      </header>
      <Outlet />
    </>
  );
}
