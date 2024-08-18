import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if using React Router
import PostAuthor from './PostAuthor'

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust formatting as needed
};

const PostItem = ({ postID, thumbnail, category, title, description, authorID, createdAt }) => {
  // Ensure that description and title are not undefined or null
  const shortDesc = description ? (description.length > 145 ? description.substring(0, 145) + "..." : description) : "No description available";
  const shortTitle = title ? (title.length > 30 ? title.substring(0, 30) + "..." : title) : "No title available";

  return (
    <article className='post-item'>
      <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title || 'Default thumbnail'} />
      <div className='post_content'>
        <Link to={`/posts/${postID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>{shortTitle}</h3>
        </Link>
        <p>{shortDesc}</p>
        <p className='post_date'>{formatDate(createdAt)}</p> {/* Display formatted creation date */}
        <div className='post_footer'>
          {/* Pass authorID to PostAuthor if needed */}
          <PostAuthor authorID={authorID} createdAt={createdAt}/>
          <Link to={`/posts/categories/${category}`} style={{ textDecoration: 'none', color: 'inherit' }} className='btn-category'>
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

// Default props to handle undefined values
PostItem.defaultProps = {
  thumbnail: '/path/to/default-thumbnail.png', // Default thumbnail path
  description: 'No description available',
  title: 'No title available',
  authorID: '',
  createdAt: new Date().toISOString(), // Default date
};
export default PostItem;
