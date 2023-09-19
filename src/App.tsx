import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { auth } from './firebase';
import { useAppDispatch } from './store/hooks';
import { setUser } from './store/reducers/userReducer';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // When Auth changes we send the
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            auth: true,
          }),
        );
        navigate('/dashboard');
      }
    });
  }, [dispatch, navigate]);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<WelcomePage />}
        ></Route>
        <Route
          path='/login'
          element={<LoginPage />}
        ></Route>
        <Route
          path='/dashboard'
          element={<DashboardPage />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
