import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="Header">
      <nav className="Nav">
        <div className="BurgerMenu">&#9776;</div>
        <ul className="Menu"><div>gfdgdgdgd</div>
          <li><Link to="/">Calendar</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;