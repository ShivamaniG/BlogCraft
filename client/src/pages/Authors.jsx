import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { AUTHORS_DATA } from '../data'; // Adjust path as needed

const Authors = () => {
  const [authors] = useState(AUTHORS_DATA);

  return (
    <section className='authors'>
      {authors.length > 0 ? (
        <div className="container authors_container">
          {authors.map(({ id, avatar, name, posts }) => (
            <Link key={id} to={`/posts/user/${id}`} className='author_link' style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="author_card">
                <div className="author_avatar">
                  <img src={avatar} alt={name} />
                </div>
                <div className="author_details">
                  <h4>{name}</h4>
                  <p>{posts} posts</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className='center'><h3>No authors found</h3></p> // Display this message if no authors are available
      )}
    </section>
  );
}

export default Authors;
