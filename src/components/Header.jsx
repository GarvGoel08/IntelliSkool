import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className='head'>
      <div className="logo">IntelliSkool</div>
      
      <div className='hamburger' onClick={toggleMenu}>
        ☰
      </div>

      <div className={`right ${menuOpen ? 'open' : ''}`}>
        <div className="menu">
          <ul className='links'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
          </ul>
        </div>
        <div className='btns'>
          <Link to="/login"><div className="sign-in-btn">Sign In</div></Link>
          <Link to="/signup"><div className="sign-up-btn">Sign Up</div></Link>
        </div>
      </div>
    </div>
  );
}
