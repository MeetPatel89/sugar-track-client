import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

export default class Landing extends Component {
    render() {
        return (
            <>
                <Header/>
                <main role="main">
                    
                <section>
                <header>
                    <h3>Monitor blood sugar levels</h3>
                </header>
       
                <p>Hello! SugarTrack allows you to keep a log of your blood sugar levels and track them over a period of time.</p>
                <br/>
        
                <button type="submit"><Link to='/register'>Sign Up</Link></button>
                <br/>
                <br/>
                <button type="submit"><Link to='/login'>Sign In</Link></button>
                </section>
                </main>
                <footer role="content-info">&#169;Meet 2020</footer>
            </>
        )
    }
} 