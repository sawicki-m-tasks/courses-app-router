import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Auth from './auth/Auth';
import AuthContextProvider from './auth/AuthContextProvider';
import LoginAuth from './auth/LoginAuth';
import { AuthContext } from './auth/AuthContext';

function App() {
  const loginContext = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={loginContext.status ? <Navigate to='/courses' /> : <Navigate to='/login' />} />
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
    </AuthContextProvider>
  );
}

export default App;
