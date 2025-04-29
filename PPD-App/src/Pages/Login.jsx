import React, { useState } from 'react';
import './Login.css';
import Header from '../Component/Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
      
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!email || !password) {
      setMessage('Please complete all information');
      return;
    }
    
    axios.post('http://localhost:8081/Login', { email, password })
      .then(res => {
        if (res.data.login) {
          navigate('/home');
        } else {
          setMessage('Invalid email or password');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        setMessage('An error occurred during login');
      });
  };
   
  return (
    <div>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h2>Log In</h2>
            <div className="login-underline"></div>
          </div>

          {message && <div className="error-message">{message}</div>}

          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="login-inputs">
              <label htmlFor="Email">
                Email <span className="required-indicator"></span>
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                placeholder="Email@example.com"
                required
                aria-required="true"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">
                Password <span className="required-indicator"></span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                aria-required="true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="remember-forgot">
              <label htmlFor="remember-me">
                <input type="checkbox" id="remember-me" /> Remember Me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <div className="login-submit">
              <button type="submit">Log In</button>
            </div>
          </form>
          <p className="login-footer">
            New Here? <Link to="/Signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
