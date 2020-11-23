import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    let welcomeMsg;
    if (props.user) {
        welcomeMsg = `Welcome ${props.user}`
    }
    return (
        <header role="banner">
            <br/>
            <h1><Link to='/'>SugarTrack</Link></h1>
            <p>{welcomeMsg}</p>
            <hr/>
        </header>
    )
}