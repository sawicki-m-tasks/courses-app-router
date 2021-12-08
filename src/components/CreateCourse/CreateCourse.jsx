/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import './CreateCourse.css';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import formatDuration from '../../helpers/pipeDuration';
import generateCurrentDate from '../../helpers/dateGenerator';
import {
  buttonText,
  inputText,
  mockedAuthorsList,
  mockedCoursesList,
} from '../../constants';

export default function CreateCourse() {
  const [selectedAuthorsID, setSelectedAuthorsID] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

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

    mockedAuthorsList.push({
      id: uuidv4(),
      name: authorName,
    });

    setAuthorName('');
  };

  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setDuration('');
    setSelectedAuthorsID([]);
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

  const handleCreateCourse = () => {
    if (inputsNotCorrect()) {
      alert('Please, fill all fields');
      return;
    }

    mockedCoursesList.push({
      id: uuidv4(),
      title,
      description,
      creationDate: generateCurrentDate(),
      duration,
      authors: selectedAuthorsID,
    });

    clearInputs();
    navigate('/courses');
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
          <Button buttonText={buttonText.createCourse} onClick={handleCreateCourse} />
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
          {selectedAuthorsID.length === mockedAuthorsList.length
            && <span>Author list empty</span>}
          {
            mockedAuthorsList.map(author => {
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
            const author = mockedAuthorsList.find(auth => auth.id === authorID);
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
