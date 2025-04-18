import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import './Header.css';
import Avatar from '../assets/avatar.jpg'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if the user is authenticated by checking the cookie
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, 
      "$1"
    );
    
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    // Delete the token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Update the authentication state
    setIsAuthenticated(false);

    // Redirect to home page using navigate
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className='head'>
      <div className="logo-nav">IntelliSkool</div>

      <div className='hamburger' onClick={toggleMenu}>
        ☰
      </div>

      <div className={`right ${menuOpen ? 'open' : ''}`}>
        <div className="menu">
          <ul className='links'>
            {/* You can add more links here */}
          </ul>
        </div>
        <div className='btns'>
          {isAuthenticated ? (
            <div className="avatar-btn">
              {/* Display the avatar if the user is authenticated */}
              <img src={Avatar} alt="Avatar" className="avatar" />
              <div onClick={handleLogout} className="sign-up-btn">Logout</div>
            </div>
          ) : (
            <>
              <Link to="/login"><div className="sign-in-btn">Sign In</div></Link>
              <Link to="/signup"><div className="sign-up-btn">Sign Up</div></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
