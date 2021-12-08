/* eslint-disable react/forbid-prop-types */
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';
import { buttonText } from '../../../../constants';

import './CourseCard.css';

export default function CourseCard(props) {
  const navigate = useNavigate();

  const showCourseDetails = () => {
    navigate(`/courses/${props.id}`);
  };

  return (
    <div className='courseCard'>
      <div className='courseCardDescription'>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className='courseCardDetails'>
        <p className='authors'>
          <b>Authors:&nbsp;</b>
          {props.authors.join(', ')}
        </p>
        <p>
          <b>Duration:&nbsp;</b>
          {props.duration}
          hours
        </p>
        <p>
          <b>Created:&nbsp;</b>
          {props.creationDate.replaceAll('/', '.')}
        </p>
        <Button buttonText={buttonText.showCourse} onClick={showCourseDetails} />
      </div>
    </div>
  );
}

CourseCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  duration: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
};
