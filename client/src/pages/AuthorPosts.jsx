import React, { useState } from 'react';
import { DUMMY_POSTS } from '../data'; // Adjust path as needed
import PostItem from '../components/PostItem';

const AuthorPosts = () => {
  const [posts] = useState(DUMMY_POSTS);

  return (
    <section className='author_posts'>
      {posts.length > 0 ? (
        <div className="container author_posts_container">
          {posts.map(({ id, thumbnail, category, title, desc, authorId }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              desc={desc}
              authorID={authorId}
            />
          ))}
        </div>
      ) : (
        <p className='center'>No posts found</p> // Display this message if no posts are available
      )}
    </section>
  );
}

export default AuthorPosts;
