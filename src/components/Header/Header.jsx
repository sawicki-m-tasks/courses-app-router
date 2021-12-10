/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Outlet,
} from 'react-router';
import Button from '../../common/Button/Button';
import { buttonText } from '../../constants';
import { userLogoutThunk } from '../../store/user/thunk';
import Logo from './components/Logo/Logo';

import './Header.css';

export default function Header() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(userLogoutThunk());
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
          <span>{user.name || user.email}</span>
          <Button buttonText={buttonText.logout} onClick={handleLogout} />
        </div>
        )}
      </header>
      <Outlet />
    </>
  );
}
