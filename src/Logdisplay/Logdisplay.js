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

    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        console.log(value);
        console.log(name);
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.year || !this.state.month || this.state.day) {
            this.setState({
                display: 'Please select the year, month and day from the above dropdown menu to display log results for that date!'
            })
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
                    const sortedLogs = [...logs[0], ...logs[1], ...logs[2]].sort((a, b) => {
                        if (a.date_time < b.date_time) {
                            return -1
                        } else {
                            return 1
                        }
                    })
                    this.setState({
                        logs: sortedLogs
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
        let loggedDates;
        (this.state.logs) &&
        (loggedDates = this.state.logs.map(log => {
            const loggedDate = moment(log.date_time).format('MMM DD YYYY');
            return loggedDate
        }))
        console.log(loggedDates);

        const uniqueLoggedDates = [...new Set(loggedDates)];
        console.log(uniqueLoggedDates);
        const uniqueLoggedMonths = [];
        const dropDownMonths = uniqueLoggedDates.map((uniqueLoggedDate, i) => {
            const year = moment(uniqueLoggedDate).format('YYYY');
            let uniqueLoggedMonth = moment(uniqueLoggedDate).format('MMM');
            if (!uniqueLoggedMonths.includes(uniqueLoggedMonth) && year === this.state.year) {
                uniqueLoggedMonths.push(uniqueLoggedMonth);
                return <option key={i} value={uniqueLoggedMonth.toLowerCase()}>{uniqueLoggedMonth}</option>
            } 
            return null;
        });

        

        const uniqueLoggedYears = [];
        const dropDownYears = uniqueLoggedDates.map((uniqueLoggedDate, i) => {
            let uniqueLoggedYear = moment(uniqueLoggedDate).format('YYYY');
            if(!uniqueLoggedYears.includes(uniqueLoggedYear)) {
                uniqueLoggedYears.push(uniqueLoggedYear);
                return <option key={i} value={uniqueLoggedYear}>{uniqueLoggedYear}</option>
            }
        })

        const uniqueLoggedDays = [];
        const dropDownDays = uniqueLoggedDates.map((uniqueLoggedDate, i) => {
            let uniqueLoggedYear = moment(uniqueLoggedDate).format('YYYY');
            let uniqueLoggedMonth = moment(uniqueLoggedDate).format('MMM')
            let uniqueLoggedDay = moment(uniqueLoggedDate).format('DD');
            if (!uniqueLoggedDays.includes(uniqueLoggedDay) && uniqueLoggedMonth.toLowerCase() === this.state.month && uniqueLoggedYear === this.state.year) {
                uniqueLoggedDays.push(uniqueLoggedDay);
                return <option key={i} value={uniqueLoggedDay}>{uniqueLoggedDay}</option>
            }
        })
        


        
        return (
            <>
            
            
            <section>
            <form onSubmit={this.handleSubmit}>
                <h2>Display log for</h2>
                <label>
                    Year:
                    <select value={this.state.year} name="year" onChange={this.handleChange}>
                        <option value="years">Years</option>
                        {dropDownYears}
                    </select>
                </label>
                <label>
                    Month:
                    <select value={this.state.month} name="month" onChange={this.handleChange}>
                        <option value="months">Months</option>
                        {dropDownMonths}
                    </select>
                </label>
                <label>
                    day:
                    <select value={this.state.day} name="day" onChange={this.handleChange}>
                        <option value="days">Days</option>
                        {dropDownDays}
                    </select>
                </label>
                <br/>
                <br/>
                <button type="submit">Display logs</button>
            </form>
            {this.state.display}
        
    
    
            </section>
            </>
        )
    }
}