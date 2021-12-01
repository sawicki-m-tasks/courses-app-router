/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router';
import Button from '../../common/Button/Button';
import { buttonText, localStorageKeys } from '../../constants';
import Logo from './components/Logo/Logo';

import './Header.css';

export default function Header() {
  const { pathname } = useLocation();
  const userName = localStorage.getItem(localStorageKeys.userName) || '';
  const navigate = useNavigate();

  const handleLogout = () => {
    for (const key of Object.values(localStorageKeys)) {
      localStorage.removeItem(key);
    }
    navigate('/login');
  };

  return (
    <>
      <header>
        <div className='logo'>
          <Logo />
        </div>
        {(pathname !== '/login' && pathname !== '/registration')
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
