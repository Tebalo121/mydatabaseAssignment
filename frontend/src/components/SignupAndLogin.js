import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const SignupAndLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unknown error');
      }

      const data = await response.json();
      console.log(isLogin ? 'Login successful:' : 'Signup successful:', data);

      if (isLogin) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{isLogin ? 'Welcome Back!' : 'Join Us!'}</h2>
        <p className="auth-subtitle">
          {isLogin
            ? 'Log in to access your account.'
            : 'Sign up to get started with us!'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <div className="auth-toggle">
          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}
          <span
            className="toggle-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupAndLogin;
