import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Avatar from '../images/avatar.png'; // Adjust the path to the avatar image

const UserProfile = () => {
  return (
    <section className='profile'>
      <div className="profile_container">
        <Link to='/myposts/sdfdfe' className='btn btn-bg' style={{
          border: '2px solid black',  // Black border
          display: 'inline-block',
        }}><h2>My Posts</h2></Link>
        <div className="profiledetails">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={Avatar} alt="Profile Avatar" />
            </div>
            <div className="form_group">
              <input
                type="file"
                id="avatar-upload"
                name="avatar"
                accept="image/png, image/jpeg"
                className="form_input"
              />
            </div>
          </div>
          <h1>User Name</h1>
          <form className="profile_form">
            <div className="form_group">
              <input
                type="email"
                id="email"
                name="email"
                className="form_input"
                placeholder="Current Email"
              />
            </div>
            <div className="form_group">
              <input
                type="password"
                id="current-password"
                name="current-password"
                className="form_input"
                placeholder="Current Password"
              />
            </div>
            <div className="form_group">
              <input
                type="password"
                id="new-password"
                name="new-password"
                className="form_input"
                placeholder="New Password"
              />
            </div>
            <div className="form_group">
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="form_input"
                placeholder="Confirm Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
