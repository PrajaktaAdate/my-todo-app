import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/todos');
    }

    // Fix for Chrome autofill not triggering onChange
    setTimeout(() => {
      const emailInput = document.querySelector('input[type="email"]');
      const passwordInput = document.querySelector('input[type="password"]');

      if (emailInput?.value) setEmail(emailInput.value);
      if (passwordInput?.value) setPassword(passwordInput.value);
    }, 100); // slight delay ensures autofill completes
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'test@task.com' && password === 'task@123') {
      localStorage.setItem('token', 'mock-token');
      navigate('/todos');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        /><br /><br />
        <button type="submit" className="auth-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
