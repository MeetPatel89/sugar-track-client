import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends Component {




    render() {
        let welcomeMsg;
    if (this.props.user) {
        welcomeMsg = <p className="header-container"><span className="welcome-msg">Welcome {this.props.user}</span><button type="button" className="log-out" onClick={this.props.handleLogOut}>Log out</button></p>
    } else {
        welcomeMsg = <><p>Keeping it (not) sweet and simple</p><p> SugarTrack helps you maintain a logbook of blood sugar levels, meals and medications to better monitor your glycemic health! </p></>
    }

        return (
            <>
            <header className="logo">
            
            <h1><Link to='/' id="header">SugarTrack</Link></h1>
            {welcomeMsg}
            
            <hr/>
        </header>
            </>
        )
        
    }

    

   

    
}