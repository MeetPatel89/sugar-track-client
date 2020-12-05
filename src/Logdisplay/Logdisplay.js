import React, { Component } from 'react';
import moment from 'moment';
import './LogDisplay.css';

export default class LogDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
           displayLogs: false,
           displayError: false,
           
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
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

    handleMouseOver = (e) => {
        const tableRow = e.target.parentElement;
       tableRow.style.backgroundColor = "darkgray"


    }

    handleMouseOut = (e) => {
        
        const tableRow = e.target.parentElement;
        
        tableRow.style.backgroundColor = "";

    }

    componentDidMount() {
        
       

    fetch(`http://localhost:8000/logs/${this.props.id}`)
        .then(res => res.json())
        .then(logs => {
            this.setState({
                logs
            })
        })

        

       
        
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
        let renderVisualizeButton;

        if (this.state.displayLogs) {
            renderLogs = this.state.filteredLogs.map((log, i) => {
                const date_time = moment(log.date_time).format('HH:mm');
                if (log.glucose) {
                return <tr onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}className="log-display-list-item" key={`${i}glucose`}><td>{date_time}</td><td>Blood Sugar Level</td><td>{log.glucose}</td></tr>
                } else if (log.meds) {
                return <tr onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}className="log-display-list-item" key={`${i}med`}><td>{date_time}</td><td>Medication</td><td>{log.meds}</td></tr>
                } else {
                return <tr onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}className="log-display-list-item" key={`${i}meal`}><td>{date_time}</td><td>Meal</td><td>{log.meals}</td></tr>
                }
            })

            renderVisualizeButton = <div className="modify-logs"><button type="button" className="visualize-logs">Visualize</button> </div>
        
        }
       
            

        
        return (
            <>
            
            
            <section className="log-display">
            <form onSubmit={this.handleSubmit}>
                <h2>Display logs for</h2>
                <div className="select-menus">
                
                    
                    <select value={this.state.year} name="year" onChange={this.handleChange}>
                        

                        
                        <option value="years">Select Year</option>
                        
                        {dropDownYears}
                        
                    </select>
                
               
                    <select value={this.state.month} name="month" onChange={this.handleChange}>
                        <option value="months">Select Mon</option>
                        {dropDownMonths}
                    </select>
                
                
                    <select value={this.state.day} name="day" onChange={this.handleChange}>
                        <option value="days">Select Day</option>
                        {dropDownDays}
                    </select>
                
                </div>
                <button className="display-logs" type="submit">Display logs</button>
                {(this.state.displayLogs) &&
                <table className="log-display-table">
                
                    <thead>
                        <tr>
                    <th>Time (24-hour)</th>
                    <th>Log Metric</th>
                    <th>Log Value</th>
                    </tr>
                    </thead>
                <tbody>
                {renderLogs}
                </tbody>
                
            </table>}
                    {(this.state.displayError) &&
                    <p style={{color: "red"}}>Please select a year, month and day from the above dropdown to display logs for that date!</p>}
                    {renderVisualizeButton}
                
                
                
            </form>
           
        
    
    
            </section>
            </>
        )
    }
}