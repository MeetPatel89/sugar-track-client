import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LogBook extends Component {
    render() {
        return (
            <section>
                <Link to='/logbook/blood_sugar'><button type="submit">Blood Sugar</button></Link>
                <Link to='/logbook/medications'><button type="submit">Medications</button></Link>
                <Link to='/logbook/meal_regimens'><button type="submit">Meal Regimens</button></Link>
                
                
                
            </section>
        )
    }
}