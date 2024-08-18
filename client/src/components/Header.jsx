import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon
import { FaBars } from 'react-icons/fa'; // Import the bars icon
import '../index.css';
import { UserContext } from '../context/userContext'; // Import UserContext

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const { currentUser } = useContext(UserContext);

  // Close the navigation when needed
  const closeNavHandler = () => {
    if (window.innerWidth > 800) {
      setIsNavShowing(true);
    } else {
      setIsNavShowing(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 800);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav_logo" onClick={closeNavHandler}>
          <div>bLOGcRAFT</div>
        </Link>

        {currentUser?.userId && isNavShowing && (
          <ul className="nav_menu">
            <li>
              <Link to="/profile/sdfdfe" onClick={closeNavHandler}>
              {/* {currentUser.username}  */}
              Shivamani G
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandler}>
                Create Posts
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler}>
                Logout
              </Link>
            </li>
          </ul>
        )}

        {!currentUser?.userId && isNavShowing && (
          <ul className="nav_menu">
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={closeNavHandler}>
                Login
              </Link>
            </li>
          </ul>
        )}

        <button
          className="nav_toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
