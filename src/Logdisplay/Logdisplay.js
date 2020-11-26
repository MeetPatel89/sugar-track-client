import React, { Component } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

export default class LogDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: ''
        }
    }

    componentDidMount() {
        const logs = []
        fetch(`http://localhost:8000/glucose_logs/${this.props.id}`)
        .then(res => res.json())
        .then(glucoseLogs => {
            logs.push(...glucoseLogs)
        })
        
        fetch(`http://localhost:8000/meals_logs/${this.props.id}`)
        .then(res => res.json())
        .then(mealsLogs => {
            logs.push(...mealsLogs)
        })

        fetch(`http://localhost:8000/meds_logs/${this.props.id}`)
        .then(res => res.json())
        .then(medsLogs => {
            logs.push(...medsLogs)
        })

        this.setState({
            logs
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