import { addAuthor, fetchAuthors } from '../../services';
import { authorAdd, authorsFetched } from './actionCreators';

export const createAuthorThunk = (authorData, cb) => async dispatch => {
  const result = await addAuthor(...authorData);
  if (!result.successful) {
    alert('something went wrong');
    return;
  }
  dispatch(authorAdd(result.result));
  cb();
};

export const fetchAuthorsThunk = () => async dispatch => {
  const authors = await fetchAuthors();
  if (!authors.successful) {
    alert('fetching authors went wrong');
    return;
  }
  dispatch(authorsFetched(authors.result));
};
