import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from './AuthContext';

export default function LoginAuth(props) {
  const loginContext = useContext(AuthContext);
  if (loginContext.logged) {
    return <Navigate to='/courses' />;
  }
  return props.children;
}

LoginAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
