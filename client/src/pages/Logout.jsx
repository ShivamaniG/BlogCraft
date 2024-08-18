import React,{useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);  // Correct context usage
  const navigate = useNavigate();  // Correct useNavigate

  useEffect(() => {
    setCurrentUser(null);  // Reset current user on logout
    navigate('/login');  // Redirect to login page
  }, [setCurrentUser, navigate]);  // useEffect to handle logout side-effect

  return <></>;  // Empty return
};

export default Logout
