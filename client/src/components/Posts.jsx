import React, { useEffect, useState } from 'react';

import PostItem from './PostItem'; // Assuming you have a PostItems component
// import Loader from './Loader';
import axios from 'axios';
// import { DUMMY_POSTS } from '../data';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
      setPosts(response.data || []); // Ensure posts is an array
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts. Please try again later.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) return <p className='center'>{error}</p>;

  return (
    <section className='posts'>
      {posts.length > 0 ? (
        <div className="container post_container">
          {posts.map(({ _id, thumbnail, category, title, description, creator, createdAt }) => (
            <PostItem
              key={_id}
              postID={_id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              authorID={creator}
              createdAt={createdAt} // Pass createdAt to PostItem
            />
          ))}
        </div>
      ) : (
        <p className='center'><h3>No posts found</h3></p>
      )}
    </section>
  );
};



export default Posts;