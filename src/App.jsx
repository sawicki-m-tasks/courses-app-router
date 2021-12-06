import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Auth from './auth/Auth';
import LoginAuth from './auth/LoginAuth';
import { userLogin } from './store/user/actionCreators';
import checkIfUserLogged from './helpers/checkIfUserLogged';
import { localStorageKeys } from './constants';

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (checkIfUserLogged() && !user.isAuth) {
    dispatch(userLogin({
      name: localStorage.getItem(localStorageKeys.userName),
      email: localStorage.getItem(localStorageKeys.userEmail),
      token: localStorage.getItem(localStorageKeys.token),
    }));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={user.isAuth ? <Navigate to='/courses' /> : <Navigate to='/login' />} />
          <Route path='registration' element={<Registration />} />
          <Route
            path='login'
            element={(
              <LoginAuth>
                <Login />
              </LoginAuth>
            )}
          />
          <Route
            path='courses'
            element={(
              <Auth>
                <Courses />
              </Auth>
            )}
          />
          <Route
            path='courses/:courseId'
            element={(
              <Auth>
                <CourseInfo />
              </Auth>
            )}
          />
          <Route
            path='courses/add'
            element={(
              <Auth>
                <CreateCourse />
              </Auth>
            )}
          />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
