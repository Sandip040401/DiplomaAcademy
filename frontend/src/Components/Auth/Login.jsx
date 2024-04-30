import React, { useState } from 'react';
import axios from 'axios';
import User from '../Auth/user-solid.png';
import Password from '../Auth/lock-alt-solid.png';
import Envelope from '../Auth/envelope-solid.png';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/signup', formData);
      console.log(response.data); // Handle successful signup
    } catch (error) {
      if (error.response.status === 500) {
        setErrorMessage("User with this email already exists.");
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);// Hides error message after 2 seconds
      } else {
        const errorMessage = error.response.data.message || 'Signup failed';
        setErrorMessage(errorMessage);
        console.error('Signup failed:', errorMessage); // Log the error
        setTimeout(() => {
          setErrorMessage('');
        }, 2000); // Hides error message after 2 seconds
      }
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={User} alt="" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Enter Your Name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <img src={Envelope} alt="" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter Your Email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <img src={Password} alt="" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter Your Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="forgot-password">Lost Password <span>Click Here</span></div>
        <div className="submit-container">
          <button className='submit' type="submit">Sign Up</button>
          <button className='submit' type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
