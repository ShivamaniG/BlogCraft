import React, { useContext, useEffect } from 'react';
import { DUMMY_POSTS } from '../data'; // Adjust path as needed
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const truncateTitle = (title, maxLength = 50) => {
  if (title.length > maxLength) {
    return `${title.substring(0, maxLength)}...`;
  }
  return title;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token; 

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login page if token is missing
    }
  }, [token, navigate]);

  return (
    <section className="dashboard">
      <div className="container dashboard_container">
        {DUMMY_POSTS.map(post => (
          <article key={post.id} className="dashboard_item">
            <div className="thumbnail">
              <img src={post.thumbnail} alt={post.title} className="post_avatar" />
            </div>
            <h5>{truncateTitle(post.title)}</h5>
            <div className="dashboard_actions">
                <Link to={`/posts/${post.id}`} className="btn btn-success">View</Link>
                <Link to={`/posts/${post.id}/edit`} className="btn btn-primary">Edit</Link>
                <Link to={`/posts/${post.id}/delete`} className="btn btn-danger">Delete</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
export default Dashboard;
