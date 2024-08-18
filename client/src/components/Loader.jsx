import React from 'react';
import Loading from '../images/loading.png'; // Correcting the import statement

const Loader = () => {
  return (
    <div className="loader">
      <img src={Loading} alt="Loading" /> 
    </div>
  );
};

export default Loader;
