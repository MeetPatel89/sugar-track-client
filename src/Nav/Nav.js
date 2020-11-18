import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    render() {
        return (
            <nav role="navigation">
      <ul>
        
        <li><Link to='/logdisplay'>LogDisplay</Link></li>
        <li><Link to='/logbook'>LogBook</Link></li>
        <li><Link to='/usermanual'>UserManual</Link></li>
        <li><Link to='/'>Log Out</Link></li>
        
      </ul>
    </nav>
        )
    }
}