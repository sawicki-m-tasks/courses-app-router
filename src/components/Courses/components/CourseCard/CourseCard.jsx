/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../common/Button/Button';
import { buttonText } from '../../../../constants';
import { deleteCourseThunk } from '../../../../store/courses/thunk';

import './CourseCard.css';
import formatDuration from '../../../../helpers/pipeDuration';

export default function CourseCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const authors = useSelector(state => state.authors.filter(auth => props.authors.indexOf(auth.id) !== -1));

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
    <div data-testid='courseCard' className='courseCard'>
      <div className='courseCardDescription'>
        <h3 data-testid='courseCardTitle'>{props.title}</h3>
        <p data-testid='courseCardDescription'>{props.description}</p>
      </div>
      <div className='courseCardDetails'>
        <p data-testid='courseCardAuthors' className='authors'>
          <b>Authors: </b>
          {authors.map(author => author.name).join(', ')}
        </p>
        <p data-testid='courseCardDuration'>
          <b>Duration: </b>
          {`${formatDuration(props.duration)} `}
          hours
        </p>
        <p data-testid='courseCardCreationDate'>
          <b>Created: </b>
          {props.creationDate.replace(/\//g, '.')}
        </p>
        <div className='courseCardButtons'>
          <Button buttonText={buttonText.showCourse} onClick={showCourseDetails} />
          {user.role === 'admin'
            && (
            <>
              <Button data_testid='courseCardUpdateButton' buttonText='Update' onClick={update} />
              <Button data_testid='courseCardDeleteButton' buttonText='Delete' onClick={handleCourseDelete} />
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
  duration: PropTypes.number.isRequired,
  creationDate: PropTypes.string.isRequired,
};
