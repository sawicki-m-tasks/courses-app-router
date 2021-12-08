import './Textarea.css';

import PropTypes from 'prop-types';

export default function Textarea(props) {
  return (
    <div className='textareaContainer'>
      {props.labelText && <label htmlFor={props.id}>{props.labelText}</label>}
      <textarea onChange={props.onChange} value={props.inputValue} type='text' id={props.id} placeholder={props.placeholderText} />
    </div>
  );
}

Textarea.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
};

Textarea.defaultProps = {
  labelText: null,
};
