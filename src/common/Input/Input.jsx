import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

export default function Input(props) {
  return (
    <div className='inputContainer'>
      {props.labelText && <label htmlFor={props.id}>{props.labelText}</label>}
      <input
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        id={props.id}
        placeholder={props.placeholderText}
      />
    </div>
  );
}

Input.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholderText: PropTypes.string.isRequired,
};

Input.defaultProps = {
  labelText: null,
  type: 'text',
};
