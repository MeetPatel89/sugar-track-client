import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LogBook.css';

export default class LogBook extends Component {
    render() {
        return (
            <>
            
            
            <div className="log-metric">
                <Link to='/logbook/blood_sugar'><button  type="button">Blood Sugar</button></Link>
                <Link to='/logbook/medications'><button  type="button">Medications</button></Link>
                <Link to='/logbook/meal_regimens'><button  type="button">Meal Regimens</button></Link>
                
                
                
            </div>
            </>
        )
    }
}