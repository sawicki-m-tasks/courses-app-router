/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Outlet,
  useNavigate,
} from 'react-router';
import Button from '../../common/Button/Button';
import { buttonText, localStorageKeys } from '../../constants';
import { userLogout } from '../../store/user/actionCreators';
import Logo from './components/Logo/Logo';

import './Header.css';

export default function Header() {
  const userName = localStorage.getItem(localStorageKeys.userName) || '';
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    for (const key of Object.values(localStorageKeys)) {
      localStorage.removeItem(key);
    }
    dispatch(userLogout());
    navigate('/login');
  };

  return (
    <>
      <header>
        <div className='logo'>
          <Logo />
        </div>
        {user.isAuth
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
