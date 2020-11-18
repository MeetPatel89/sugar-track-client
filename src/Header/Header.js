import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header role="banner">
            <br/>
            <h1><Link to='/'>SugarTrack</Link></h1>
            <hr/>
        </header>
    )
}