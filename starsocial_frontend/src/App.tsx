import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import Authentiocation from './layout/Authentication';
import Layout from './layout/HomePage';
import Home from './pages/Home';
import Login from './pages/Login';
import Message from './pages/Message';
import Profile from './pages/Profile';
import Reels from './pages/Reels';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Routes>
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
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default App;
