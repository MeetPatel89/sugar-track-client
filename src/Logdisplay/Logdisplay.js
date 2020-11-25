import React, { Component } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

export default class LogDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            glucoseLogs: '',
            mealsLogs: '',
            medsLogs: ''
        }
    }

    componentDidMount() {

        fetch(`http://localhost:8000/glucose_logs/${this.props.id}?sort=date_time`)
        .then(res => res.json())
        .then(sortedGlucoseLogs => {
            this.setState({
                glucoseLogs: sortedGlucoseLogs
            })
        })
        
        fetch(`http://localhost:8000/meals_logs/${this.props.id}?sort=date_time`)
        .then(res => res.json())
        .then(sortedMealsLogs => {
            this.setState({
                mealsLogs: sortedMealsLogs
            })
        })

        fetch(`http://localhost:8000/meds_logs/${this.props.id}?sort=date_time`)
        .then(res => res.json())
        .then(sortedMedsLogs => {
            this.setState({
                medsLogs: sortedMedsLogs
            })
        })
        
    }
    render() {
        return (
            <>
            
            
            <section>
            <form>
                <h2>Display log for</h2>
                <label>
                    month:
                    <select value="month" onChange={this.handleChange}>
                        <option></option>
                    </select>
                </label>
                <label>
                    day:
                    <select value="day" onChange={this.handleChange}>
                        <option></option>
                    </select>
                </label>
            </form>
        
    
    
            </section>
            </>
        )
    }
}