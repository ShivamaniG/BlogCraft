import React, { useEffect } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const DeletePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token; 

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login page if token is missing
    }
  }, [token, navigate]);
  return (
    <div>
      <Link to={'/posts/werner/delete'} className='btn btn-danger'>Delete</Link>
    </div>
  )
}

export default DeletePost
