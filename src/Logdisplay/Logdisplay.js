import React, { Component } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import moment from 'moment';
import './LogDisplay.css';

export default class LogDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
           displayLogs: false,
           displayError: false
           
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
        const year = this.state.year;
        const month = this.state.month;
        const day = this.state.day;
        console.log(year);
        console.log(month);
        console.log(day);
        if (year && month && day) {
            const date = `${month} ${day} ${year}`
            console.log(date);
            const filteredLogs = this.state.logs.filter(log => {
               return moment(log.date_time).format('MMM DD YYYY') === date
            }) 
            
            this.setState({
                displayLogs: true,
                displayError: false,
                filteredLogs
            })
        } else {
            this.setState({
                displayLogs: false,
                displayError: true
            })
        }

    }

    componentDidMount() {
        
        /*
      let getGlucoseLogs =  fetch(`http://localhost:8000/glucose_logs/${this.props.id}`)
        .then(res => res.json())
        .then(glucoseLogs => glucoseLogs)
        
     let getMealsLogs =  fetch(`http://localhost:8000/meals_logs/${this.props.id}`)
        .then(res => res.json())
        .then(mealsLogs => mealsLogs)

     let getMedsLogs = fetch(`http://localhost:8000/meds_logs/${this.props.id}`)
        .then(res => res.json())
        .then(medsLogs => medsLogs)
    */

    fetch('http://localhost:8000/logs')
        .then(res => res.json())
        .then(logs => {
            this.setState({
                logs
            })
        })

        /*

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
                return <option key={i} value={uniqueLoggedMonth}>{uniqueLoggedMonth}</option>
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
            if (!uniqueLoggedDays.includes(uniqueLoggedDay) && uniqueLoggedMonth === this.state.month && uniqueLoggedYear === this.state.year) {
                uniqueLoggedDays.push(uniqueLoggedDay);
                return <option key={i} value={uniqueLoggedDay}>{uniqueLoggedDay}</option>
            }
        })

        let renderLogs;
        if (this.state.displayLogs) {
            renderLogs = this.state.filteredLogs.map((log, i) => {
                const date_time = moment(log.date_time).format('HH:mm');
                if (log.glucose) {
                return <li key={`${i}`}>Your blood sugar level was {log.glucose} at {date_time}</li>
                } else if (log.meds) {
                return <li key={i}>You took {log.meds} medication(s) at {date_time} </li>
                } else {
                return <li key={i}>You ate {log.meals} at {date_time} </li>
                }
            })
        } else {
            renderLogs = <p>Please select a year, month and day from the above dropdown to display logs for that date!</p>
        }
            

        
        return (
            <>
            
            
            <section>
            <form onSubmit={this.handleSubmit}>
                <h2>Display log for</h2>
                <div className="select-menus">
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
                </div>
                <button type="submit">Display logs</button>
            </form>
           {renderLogs}
        
    
    
            </section>
            </>
        )
    }
}