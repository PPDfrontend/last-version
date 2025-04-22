import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Component/Header';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: '',
    phone: '',
    dob: '',
    gender: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Use only one API call
      const response = await axios.post('http://localhost:8081/signup', formData);
      console.log('User registered successfully:', response.data);
      navigate('/'); // Redirect to home page or login page
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <Header/>
      <div className="SignUp-page">
        <div className="SignUp-container">
          {/* Header */}
          <div className="SignUp-header">
            <h2>Create Account</h2>
            <div className="SignUp-underline"></div>
          </div>
          
          {message && <div className="error-message">{message}</div>}
          
          <form id="signupForm" onSubmit={handleSubmit}>
            <div className="SignUp-inputs">
              {/* Form Fields - Left and Right Sections */}
              <div className="SignUp-form">
                {/* Right Section (Personal Info) */}
                <div className="SignUp-right">
                  <label htmlFor="firstName">
                    First Name <span className="required-indicator"></span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                  <label htmlFor="lastName">
                    Last Name <span className="required-indicator"></span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="last_name" // Fixed name to match state
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                  <label htmlFor="phoneNumber">
                    Phone Number <span className="required-indicator"></span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phone"
                    placeholder="+213 "
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                  <label htmlFor="email">
                    Email <span className="required-indicator"></span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                </div>

                {/* Left Section (Password, DOB, Gender) */}
                <div className="SignUp-left">
                  <label htmlFor="password">
                    Password <span className="required-indicator"></span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                  <label htmlFor="passwordConfirmation">
                    Password Confirmation <span className="required-indicator"></span>
                  </label>
                  <input
                    type="password"
                    id="passwordConfirmation"
                    name="cpassword"
                    placeholder="Confirm your password"
                    value={formData.cpassword}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                  <label htmlFor="dob">
                    Date of Birth <span className="required-indicator"></span>
                  </label>
                  <input 
                    type="date" 
                    id="dob" 
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    aria-required="true" 
                  />
                  {/* Gender Selection */}
                  <div className="gender-selection">
                    <label htmlFor="gender">
                      Gender <span className="required-indicator"></span>
                    </label>
                    <div className="radio-group">
                      <div className="radio-option">
                        <input 
                          type="radio" 
                          id="male" 
                          name="gender" 
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleChange}
                          required
                          aria-required="true" 
                        />
                        <label htmlFor="male">Male</label>
                      </div>
                      <div className="radio-option">
                        <input 
                          type="radio" 
                          id="female" 
                          name="gender" 
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleChange}
                        />
                        <label htmlFor="female">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="SignUp-submit">
              <button type="submit">Sign Up</button>
            </div>
          </form>
          
          <p className="SignUp-footer">
            Already have an Account ? <Link to="/Login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;