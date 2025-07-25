import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import TodoApp from './components/TodoApp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Listen for changes to localStorage (e.g., login/logout in other tabs)
  useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Also update on route change (for single-tab login)
  const location = useLocation();
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/todos"
        element={isLoggedIn ? <TodoApp /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
