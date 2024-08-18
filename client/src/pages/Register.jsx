import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  // Initializing state for user data
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '' 
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = response.data;  
      console.log(newUser);

      if (newUser) {
        navigate('/');  
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');  
    }
  };

  return (
    <section className='register'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register_form" onSubmit={registerUser}>
          {error && (
            <p className="form_error-message">
              {error}
            </p>
          )}
          {/* Name input */}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
          />

          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />

          {/* Confirm Password input */}
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={changeInputHandler}
          />

          {/* Register button */}
          <button type="submit" className="btn btn-primary">Register</button>
        </form>

        {/* Link to login page */}
        <small>Already have an account? <Link style={{ textDecoration: 'none', color: 'blue' }} to="/login">Login</Link></small>
      </div>
    </section>
  );
};

export default Register;
