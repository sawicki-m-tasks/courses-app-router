import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function Auth(props) {
  const user = useSelector(state => state.user);
  if (!user.isAuth) {
    return <Navigate to='/login' />;
  }
  return props.children;
}

Auth.propTypes = {
  children: PropTypes.element.isRequired,
};
