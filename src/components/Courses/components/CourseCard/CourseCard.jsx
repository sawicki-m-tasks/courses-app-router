/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../common/Button/Button';
import { buttonText } from '../../../../constants';
import { deleteCourseThunk } from '../../../../store/courses/thunk';

import './CourseCard.css';

export default function CourseCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const showCourseDetails = () => {
    navigate(`/courses/${props.id}`);
  };

  const handleCourseDelete = async () => {
    dispatch(deleteCourseThunk(props.id, user.token));
  };

  const update = () => {
    navigate(`/courses/update/${props.id}`);
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
          &nbsp;hours
        </p>
        <p>
          <b>Created:&nbsp;</b>
          {props.creationDate.replaceAll('/', '.')}
        </p>
        <div className='courseCardButtons'>
          <Button buttonText={buttonText.showCourse} onClick={showCourseDetails} />
          {user.role === 'admin'
            && (
            <>
              <Button buttonText='Update' onClick={update} />
              <Button buttonText='Delete' onClick={handleCourseDelete} />
            </>
            )}
        </div>
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
