import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedOut: false
        }
    }

    handleClick = () => {
        this.setState({
            isLoggedOut: true
        })
    }

    render() {
        let welcomeMsg;
    if (this.props.user) {
        welcomeMsg = <p className="flex-container"><span className="welcome-msg">Welcome {this.props.user}</span><span><button type="button" className="log-out" onClick={this.props.handleClick}>Log out</button></span></p>
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