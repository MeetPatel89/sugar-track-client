import React, { Component } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import moment from 'moment';

export default class LogDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    componentDidMount() {
        
      let getGlucoseLogs =  fetch(`http://localhost:8000/glucose_logs/${this.props.id}`)
        .then(res => res.json())
        .then(glucoseLogs => glucoseLogs)
        
     let getMealsLogs =  fetch(`http://localhost:8000/meals_logs/${this.props.id}`)
        .then(res => res.json())
        .then(mealsLogs => mealsLogs)

     let getMedsLogs = fetch(`http://localhost:8000/meds_logs/${this.props.id}`)
        .then(res => res.json())
        .then(medsLogs => medsLogs)

     

        Promise.all([getGlucoseLogs, getMealsLogs, getMedsLogs])
                .then(logs => {
                    this.setState({
                        logs: [...logs[0], ...logs[1], ...logs[2]]
                    })
                })

        /*
        const loggedMonths = logs.map(log => {
            const loggedMonth = moment(log.date_time).format('MMM');
            return loggedMonth;
        })
        const uniqueLoggedMonth = [...new Set(loggedMonths)];
        console.log(loggedMonths);
        console.log(uniqueLoggedMonth);
       */
        
    }
    render() {
        let loggedMonths;
        (this.state.logs) &&
        (loggedMonths = this.state.logs.map(log => {
            const loggedMonth = moment(log.date_time).format('MMM');
            return loggedMonth
        }))
        console.log(loggedMonths);

        const uniqueLoggedMonth = [...new Set(loggedMonths)];
        console.log(uniqueLoggedMonth);
        
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