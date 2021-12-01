/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from './AuthContext';
import checkIfUserLogged from '../helpers/checkIfUserLogged';

export default function AuthContextProvider(props) {
  const [logged, setLogged] = useState(checkIfUserLogged());
  const toggle = status => {
    setLogged(status);
  };
  const value = { logged, toggle };
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
