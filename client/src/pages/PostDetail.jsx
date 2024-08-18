import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DeletePost from './DeletePost';
import { UserContext } from '../context/userContext';

const PostDetail = () => {
  const { id } = useParams(); // Correctly extract postID from URL parameters
  const [post, setPost] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        console.log(response.data); // Check the structure of the response
        setPost(response.data);
        setCreatorId(response.data.creator);
      } catch (err) {
        setError('Failed to fetch post details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    getPost();
  }, [id, setCreatorId]);  // Include setCreatorId here
  // Add id as a dependency to refetch if id changes

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className='post_detail'>
      {post && (
        <div className="container post-detail_container">
          <div className="post-detail_header">
            {/* Uncomment and use PostAuthor if required */}
            {/* <PostAuthor authorID={creatorId} /> */}
            {currentUser?.id === post?.creator && (
              <div className="post-detail_buttons">
                <Link to={`/posts/${id}/edit`} className='btn btn-primary'>Edit</Link>
                <DeletePost/>
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className='post-detail_thumbnail'>
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt='Post Thumbnail' />
          </div>
          <p>{post.description}</p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
