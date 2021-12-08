import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from './AuthContext';

export default function Auth(props) {
  const loginContext = useContext(AuthContext);
  if (!loginContext.loginStatus) {
    return <Navigate to='/login' />;
  }
  return props.children;
}

Auth.propTypes = {
  children: PropTypes.element.isRequired,
};
