import React, { Component } from 'react';
import moment from 'moment';

export default class SugarLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: '',
      date: '',
      glucose: '',
      time: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
   const date_time_moment = moment(`${this.state.date} ${this.state.time}`, 'YYYY-MM-DD HH:mm');
   const date_time = date_time_moment.toISOString();
   const user_id = this.props.id;
   if (date_time_moment.isBefore(moment().subtract(7, 'days'))) {
     this.setState({
       error: 'You are not allowed to log glucose values for dates which are more than one week old'
     })
   } else if (date_time_moment.isAfter(moment())){
      this.setState({
        error: 'You are not allowed to log glucose values for dates in the future',
        message: ''
      })
   } else {
    const newGlucoseLog = {
      user_id: this.props.id,
      date_time,
      glucose: this.state.glucose
    };

    fetch('http://localhost:8000/glucose_logs')
    .then(res => res.json())
    .then(glucoseLogs => {
      
      const duplicateGlucoseLog = glucoseLogs.find(glucoseLog => glucoseLog.date_time === newGlucoseLog.date_time && glucoseLog.user_id === user_id)
      
      if (duplicateGlucoseLog) {
        this.setState({
          error: 'You have already logged a glucose value for the selected date and time',
          message: ''
        })
      } else {
        fetch('http://localhost:8000/glucose_logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGlucoseLog)
    })
    .then(newGlucoseLog => newGlucoseLog.json())
    .then(() => {
      
      
      this.setState({
        message: 'You have successfully logged a glucose value',
        error: '',
        glucose: '',
        date: '',
        time: ''
      })
    })
      }
      
    })
   }
   
    
    
    
    
    
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      
    })

  }

    render() {
        return (
            <section className="sugar-levels">
          <h2>Enter Sugar Levels</h2>
        <form className="sugar-levels" onSubmit={this.handleSubmit}>
            <div className="label-control">
              <label htmlFor="sugar-concentration">Sugar Concentration (mg/dl)</label>
              <input placeholder="For e.g. 120" type="number" name='glucose' value={this.state.glucose} id="sugar-concentration" onChange={this.handleChange} min="0" max="2000" required/>
              
            </div>
            
            <div className="label-control">
              <label htmlFor="date">Date:</label>
              <input type="date" name="date" id="date" value={this.state.date} onChange={this.handleChange} required/>
            </div>
            <div className="label-control">
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" value={this.state.time} name="time" onChange={this.handleChange} required/>
            </div>
            
            <button className="sugar-log-submit" type="submit">Submit</button>
            <p style={{color: "#2f004f", margin: "10px"}}>{this.state.message}</p>
            <p style={{color: "red", width: "100%"}}>{this.state.error}</p>
        </form>
        </section>
        )
    }
}
