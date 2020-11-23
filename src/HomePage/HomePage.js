import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogDisplay from '../Logdisplay/Logdisplay';
import LogBook from '../LogBook/LogBook';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';

export default class HomePage extends Component {
    render() {
        return (
            <>
            <Header user={this.props.user}/>
                <Nav/>
    <br/>
    <br/>
    <main role="main">
      <header role="banner">
        <h1>Sugar Track</h1>
      </header>
        
      
        <section className="intro">
            <h2>Introduction</h2>
            <ul>
                <li><span><Link to='/logbook'>Logbook</Link></span>: Where you can log values for blood glucose, medications and meals</li>
                <li><span><Link to='/logdisplay'>LogDisplay</Link></span>: Where you can visulaize the daily logged values</li>
                <li><span><Link to='/usermanual'>UserManual</Link></span>: Where you can learn more about this app and how to use it optimally</li>
            </ul>
        </section>
      
    </main>
    <footer role="content-info">&#169;Meet 2020</footer>
            </>
        )
    }
}