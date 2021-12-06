import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function LoginAuth(props) {
  const user = useSelector(state => state.user);
  if (user.isAuth) {
    return <Navigate to='/courses' />;
  }
  return props.children;
}

LoginAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
