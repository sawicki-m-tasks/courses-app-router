/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import './CourseForm.css';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import formatDuration from '../../helpers/pipeDuration';
import {
  buttonText,
  inputText,
} from '../../constants';
import { createAuthorThunk } from '../../store/authors/thunk';
import { createCourseThunk, updateCourseThunk } from '../../store/courses/thunk';

export default function CourseForm() {
  const params = useParams();
  const prefill = Object.entries(params).length !== 0;
  const course = useSelector(state => state.courses.find(courseEl => courseEl.id === params.courseId));
  const authors = useSelector(state => state.authors);
  const user = useSelector(state => state.user);

  const [selectedAuthorsID, setSelectedAuthorsID] = useState(prefill ? course.authors : []);
  const [authorName, setAuthorName] = useState('');
  const [duration, setDuration] = useState(prefill ? course.duration.toString() : '');
  const [title, setTitle] = useState(prefill ? course.title : '');
  const [description, setDescription] = useState(prefill ? course.description : '');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddAuthor = id => {
    setSelectedAuthorsID([...selectedAuthorsID, id]);
  };

  const handleDeleteAuthor = e => {
    const selectedID = e.target.parentElement.getAttribute('authorid');
    const filteredAUthors = selectedAuthorsID.filter(id => id !== selectedID);
    setSelectedAuthorsID(filteredAUthors);
  };

  const handleCreateAuthor = () => {
    if (authorName.length < 2) {
      alert('Author\'s name should have at least 2 characters');
      return;
    }
    dispatch(createAuthorThunk([authorName, user.token], () => {
      setAuthorName('');
    }));
  };

  const inputsNotCorrect = () => {
    if (selectedAuthorsID.length === 0) {
      return true;
    }
    if (duration === '0') {
      return true;
    }
    return [duration, title, description].some(el => el === '');
  };

  const getCourseData = () => ({
    title,
    description,
    duration: parseInt(duration, 10),
    authors: selectedAuthorsID,
  });

  const handleCreateCourse = async () => {
    if (inputsNotCorrect()) {
      alert('Please, fill all fields');
      return;
    }
    dispatch(createCourseThunk(getCourseData(), user.token, () => {
      navigate('/courses');
    }));
  };

  const handleCourseUpdate = async () => {
    if (inputsNotCorrect()) {
      alert('Please, fill all fields');
      return;
    }
    dispatch(updateCourseThunk(getCourseData(), course.id, user.token, () => {
      navigate('/courses');
    }));
  };

  const handleAuthorNameChange = e => {
    setAuthorName(e.target.value);
  };

  const handleDurationChange = e => {
    const durationInput = e.target.value;
    setDuration(durationInput);
  };

  const handleTitleChange = e => {
    const titleInputValue = e.target.value;
    setTitle(titleInputValue);
  };

  const handleDescriptionChange = e => {
    const descriptionTextareaValue = e.target.value;
    setDescription(descriptionTextareaValue);
  };

  return (
    <div className='newCourse'>
      <div className='courseDetails'>
        <div className='courseDetailsTop'>
          <Input type='text' onChange={handleTitleChange} value={title} labelText={inputText.courseTitle.label} placeholderText={inputText.courseTitle.placeholder} id='courseTitle' />
          <Button buttonText={prefill ? buttonText.updateCourse : buttonText.createCourse} onClick={prefill ? handleCourseUpdate : handleCreateCourse} />
        </div>
        <div className='courseDetailsBottom'>
          <Textarea onChange={handleDescriptionChange} inputValue={description} labelText={inputText.description.label} placeholderText={inputText.description.placeholder} id='courseDescription' />
        </div>
      </div>
      <div className='authorDetails'>
        <div className='authorDetailsLeft'>
          <div className='createAuthor'>
            <h3>Add author</h3>
            <Input type='text' onChange={handleAuthorNameChange} value={authorName} labelText={inputText.authorName.label} placeholderText={inputText.authorName.placeholder} id='createAuthor' />
            <Button buttonText={buttonText.createAuthor} onClick={handleCreateAuthor} />
          </div>
          <div className='duration'>
            <h3>Duration</h3>
            <Input type='number' onChange={handleDurationChange} value={duration} labelText={inputText.duration.label} placeholderText={inputText.duration.placeholder} id='timeDuration' />
            <span>
              Duration:
              <b>{formatDuration(duration)}</b>
              hours
            </span>
          </div>
        </div>
        <div className='authorDetailsRight'>
          <h3>Authors</h3>
          {selectedAuthorsID.length === authors.length
            && <span>Author list empty</span>}
          {
            authors.map(author => {
              if (selectedAuthorsID.indexOf(author.id) === -1) {
                return (
                  <div key={author.id} authorid={author.id} className='author'>
                    <span>{author.name}</span>
                    <Button buttonText={buttonText.addAuthor} onClick={() => handleAddAuthor(author.id)} />
                  </div>
                );
              }
            })
          }
          <h3>Course authors</h3>
          {selectedAuthorsID.length === 0
           && <span>Author list empty</span>}
          {selectedAuthorsID.map(authorID => {
            const author = authors.find(auth => auth.id === authorID);
            return (
              <div key={author.id} authorid={author.id} className='author'>
                <span>{author.name}</span>
                <Button buttonText='Delete author' onClick={handleDeleteAuthor} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
