import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LogBook.css';

export default class LogBook extends Component {
    render() {
        return (
            <>
            
            
            <div className="log-metric">
                <Link to='/logbook/blood_sugar'><button className="sugar-logbook"  type="button">Blood Sugar</button></Link>
                <Link to='/logbook/medications'><button className="med-logbook"  type="button">Medications</button></Link>
                <Link to='/logbook/meal_regimens'><button className="meal-logbook"  type="button">Meal Regimens</button></Link>
                
                
                
            </div>
            </>
        )
    }
}