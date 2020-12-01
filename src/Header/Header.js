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
        welcomeMsg = <p>Welcome {this.props.user}</p>
    }

        return (
            <>
            <header className="logo">
            
            <h1><Link to='/'>SugarTrack</Link></h1>
            {welcomeMsg}
            
            <hr/>
        </header>
            </>
        )
        
    }

    

   

    
}