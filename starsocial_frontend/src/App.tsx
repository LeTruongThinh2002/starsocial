import {useEffect} from 'react';
import {Toaster} from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Authentiocation from './layout/Authentication';
import Layout from './layout/HomePage';
import Home from './pages/Home';
import Login from './pages/Login';
import Message from './pages/Message';
import Profile from './pages/Profile';
import Reels from './pages/Reels';
import Register from './pages/Register';
import {getProfileAction} from './redux/auth/auth.action';

const App = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const {auth}: any = useSelector(store => store);

  useEffect(() => {
    getProfileAction()(dispatch);
  }, [jwt, dispatch]);

  return (
    <Router>
      <Toaster />
      <Routes>
        {auth.user ? (
          <>
            <Route
              path='/'
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path='/reels'
              element={
                <Layout>
                  <Reels />
                </Layout>
              }
            />
            <Route
              path='/profile/:id'
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path='/message'
              element={
                <Layout>
                  <Message />
                </Layout>
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </>
        ) : (
          <>
            <Route
              path='/login'
              element={
                <Authentiocation>
                  <Login />
                </Authentiocation>
              }
            />
            <Route
              path='/register'
              element={
                <Authentiocation>
                  <Register />
                </Authentiocation>
              }
            />
            <Route path='*' element={<Navigate to='/login' replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
