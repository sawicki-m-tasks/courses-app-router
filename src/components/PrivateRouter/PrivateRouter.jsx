/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

export default function PrivateRouter(props) {
  const user = useSelector(state => state.user);
  if (user.role === 'admin') {
    return props.children;
  }
  return <Navigate to='/login' />;
}

PrivateRouter.propTypes = {
  children: PropTypes.element.isRequired,
};
