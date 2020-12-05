import React, { Component, Fragment } from 'react';
import moment from 'moment';
import './LogDisplay.css';
import LogTable from '../LogTable/LogTable';

export default class LogDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
           displayLogs: false,
           displayError: false,
           year: '',
           month: '',
           day: '',
           expandView: false
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
        } 
         else {
            this.setState({
                displayLogs: false,
                displayError: true,
                
                month: '',
                day: ''
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

    handleClick = (e) => {
        const editRow = e.target.parentElement.nextSibling.firstChild;
        editRow.setAttribute("class", "")
    }

    handleCancel = (e) => {
        const editRow = e.target.parentElement;
        editRow.setAttribute("class", "hidden");

    }

    handleDelete = (e) => {
        console.log(e.target.parentElement.parentElement.previousElementSibling);
        const DeleteRow = e.target.parentElement.parentElement.previousElementSibling;
        console.log(DeleteRow.getAttribute('id'))    
        
    }

    handleEdit = (e) => {
        console.log(e.target.parentElement);
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
            return null;
            
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
            return null;
        })

        let renderLogs;
       let editRow = <tr>
       <td colSpan="3" className="hidden">
       
        <button type="button" className="edit-button" onClick={this.handleEdit}>Edit</button>
       <button type="button" className="delete-button" onClick={this.handleDelete}>Delete</button>
       <button type="button" className="cancel-button" onClick={this.handleCancel}>Cancel</button>
   
       </td>
        </tr>

        if (this.state.displayLogs) {
            renderLogs = this.state.filteredLogs.map((log) => {
                const date_time = moment(log.date_time).format('HH:mm');
                if (log.glucose) {
                return <Fragment key={`${log.id}glu`}><tr id={`${log.id}glu`} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleClick} className="log-display-list-item" ><td>{date_time}</td><td>Glucose</td><td>{log.glucose}</td></tr>
                    
                    {editRow}
                        
                        </Fragment>
                } else if (log.meds) {
                return <Fragment key={`${log.id}med`}><tr id={`${log.id}med`}  onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleClick} className="log-display-list-item" ><td>{date_time}</td><td>Medication</td><td>{log.meds}</td></tr>{editRow}</Fragment>
                } else {
                return <Fragment key={`${log.id}meal`}><tr id={`${log.id}meal`} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleClick} className="log-display-list-item" ><td>{date_time}</td><td>Meal</td><td>{log.meals}</td></tr>{editRow}</Fragment>
                }
            })
        
            
        }
       
            

        
        return (
            <>
            
            
            <section className="log-display">
            <form onSubmit={this.handleSubmit}>
                <h2>Display logs for</h2>
                <div className="select-menus">
                
                    
                    <select value={this.state.year} name="year" onChange={this.handleChange}>
                        

                        
                        <option value="">Select Year</option>
                        
                        {dropDownYears}
                        
                    </select>
                
               
                    <select value={this.state.month} name="month" onChange={this.handleChange}>
                        <option value="">Select Mon</option>
                        {dropDownMonths}
                    </select>
                
                
                    <select value={this.state.day} name="day" onChange={this.handleChange}>
                        <option value="">Select Day</option>
                        {dropDownDays}
                    </select>
                
                </div>
                <button className="display-logs" type="submit">Display logs</button>
                {(this.state.displayLogs) &&
                <LogTable renderLogs={renderLogs}/>}
                    {(this.state.displayError) &&
                    <p style={{color: "red"}}>Please select a year, month and day from the above dropdown to display logs for that date!</p>}
                    
                
                
                
            </form>
           
        
    
    
            </section>
            </>
        )
    }
}