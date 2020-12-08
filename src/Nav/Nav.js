import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  return (
    <nav className="navigation">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/logdisplay">LogDisplay</Link>
        </li>
        <li>
          <Link to="/logbook">LogBook</Link>
        </li>
        <li>
          <Link to="/usermanual">UserManual</Link>
        </li>
      </ul>
    </nav>
  );
}
