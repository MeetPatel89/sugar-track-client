import React from 'react';
import { Link } from 'react-router-dom';
import './Introduction.css';

export default function() {
    return (
        <section className="intro">
            <h2>Introduction</h2>
            <ul>
                <li><span><Link to='/logbook'>Logbook</Link></span>: Where you can log values for blood glucose, medications and meals</li>
                <li><span><Link to='/logdisplay'>LogDisplay</Link></span>: Where you can visualize the daily logged values</li>
                <li><span><Link to='/usermanual'>UserManual</Link></span>: Where you can learn more about this app and how to use it optimally</li>
            </ul>
        </section>
    )
}