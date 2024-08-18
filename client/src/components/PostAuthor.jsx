import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Avatar from '../images/avatar.png'; // Adjust the path to the avatar image
import { useState } from 'react';
import axios from 'axios';

const PostAuthor = ({ authorID, authorName, authorRole, createdAt }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(''); // State for avatar URL

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
        setAuthor(response.data);
        setAvatarUrl(`${process.env.REACT_APP_BASE_URL}/uploads/${response.data.avatar}`); // Update avatar URL
      } catch (error) {
        console.error('Error fetching author:', error);
        setError('Failed to fetch author details');
      } finally {
        setLoading(false);
      }
    };

    if (authorID) {
      getAuthor();
    }
  }, [authorID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Link to={`/posts/users/${authorID}`} style={{ textDecoration: 'none', color: 'inherit' }} className='post_author'>
        <div className="post_author-avatar">
          <img
            src={avatarUrl || `${process.env.REACT_APP_ASSESTS_URL}/uploads/${author?.avatar}`} // Fallback image
            alt="Author Avatar"
            onError={(e) => e.target.src = Avatar} // Handle image load error
          />
        </div>
        <div className="post_author_details">
          <h5>By: {author?.name || authorName || 'Author Name'}</h5>
          {/* <small>Just Now</small>  */}
        </div>
      </Link>
    </div>
  );
};

// Default props to handle undefined values
PostAuthor.defaultProps = {
  authorID: '',
  authorName: 'Author Name',
  authorRole: 'Author Role',
  createdAt: 'Unknown date',
};

export default PostAuthor;
