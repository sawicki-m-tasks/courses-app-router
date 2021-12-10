import React from 'react';
/* eslint-disable react/button-has-type */
import './Button.css';

import PropTypes from 'prop-types';

export default function Button(props) {
  const handleClick = e => {
    if (props.type !== 'submit') {
      props.onClick(e);
    }
  };

  return (
    <button data-testid={props.data_testid} type={props.type ? props.type : 'button'} className='baseButton' onClick={handleClick}>
      { props.buttonText }
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  data_testid: PropTypes.string,
};

Button.defaultProps = {
  data_testid: '',
  type: 'button',
  onClick: () => {},
};
