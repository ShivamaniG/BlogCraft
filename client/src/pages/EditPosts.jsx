import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const EditPosts = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token; 

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login page if token is missing
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !category || !description || !image) {
      setError('Please fill in all fields and select an image.');
      return;
    }
    setError('');
    // Handle form submission logic here (e.g., send data to API)
    console.log({ title, category, description, image });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <section>
      <div className="create-post">
        <div className="container create_post">
          <h2>Edit Post</h2>
          {error && <p className="form_error-message">{error}</p>}
          <form className="form create-post_form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form_input"
              placeholder="Enter post title"
            />
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form_input"
            >
              <option value="">Select a category</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Art">Art</option>
              <option value="Technology">Technology</option>
            </select>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form_input"
              placeholder="Enter post description"
            />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="form_input"
            />
            <button type="submit" className="btn btn-primary">Edit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPosts;
