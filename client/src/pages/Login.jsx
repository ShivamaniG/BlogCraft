import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

const Login = () => {
  // Initializing state for user data
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Accessing setCurrentUser from UserContext
  const { setCurrentUser } = useContext(UserContext); 

  // Handling input changes
  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const loginUser = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = response.data;

      // Set the current user in the context
      setCurrentUser(user);

      // Redirect after successful login
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className='register'>
      <div className="container">
        <h2>Login</h2>
        <form className="form register_form" onSubmit={loginUser}>
        {error && (
            <p className="form_error-message">
              {error}
            </p>
          )}
          
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

          {/* Register button */}
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        {/* Link to login page */}
        <small>Don't have an account? <Link style={{ textDecoration: 'none', color: 'blue' }} to="/register">Sign In</Link></small>
      </div>
    </section>
  );
};

export default Login;
