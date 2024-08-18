// SAME AS AUTHORS PAGE
// SOME MISTAKE IN AUTHORS PAGE 
// SO LEAVING IT
import React, { useState } from 'react';
import PostItem from '../components/PostItem'; // Assuming you have a PostItems component
import { DUMMY_POSTS } from '../data';

const CategoryPosts = () => {
    const [posts] = useState(DUMMY_POSTS);

    return (
      <section className='posts'>
        {posts.length > 0 ? (
          <div className="container post_container">
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

export default CategoryPosts
