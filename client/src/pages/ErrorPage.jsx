import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ErrorPage = () => {
  return (
    <section className='error_page d-flex flex-column align-items-center vh-100'>
      <div className="text-center">
        <Link to="/" className="btn btn-primary mb-3">Go Back to Home</Link>
        <h1 class="fw-bold">Page Not Found</h1>
      </div>
    </section>
  );
}

export default ErrorPage;
