import React, { Component } from 'react';
import moment from 'moment';

export default class SugarLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    /*
    const date_time = moment(`${this.state.date}T${this.state.time}`).toISOString()
    */
   const date_time_moment = moment(`${this.state.date} ${this.state.time}`, 'YYYY-MM-DD HH:mm');
   const date_time = date_time_moment.toISOString();
   
   if (date_time_moment.isBefore(moment().subtract(7, 'days'))) {
     this.setState({
       error: 'You are not allowed to log glucose values for dates which are more than one week old'
     })
   } else if (date_time_moment.isAfter(moment())){
      this.setState({
        error: 'You are not allowed to log glucose values for dates in the future'
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
      console.log(newGlucoseLog);
      const duplicateGlucoseLog = glucoseLogs.find(glucoseLog => glucoseLog.date_time === newGlucoseLog.date_time)
      console.log(duplicateGlucoseLog);
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
    .then(newGlucoseLog => {
      console.log(newGlucoseLog);
      
      this.setState({
        message: 'You have successfully logged a glucose value',
        error: ''
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
            <section>
          <h2>Enter Sugar Levels</h2>
        <form className='sugar-levels' onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="sugar-concentration">Sugar Concentration</label>
              <input placeholder='sugar level' type="number" name='glucose' id='sugar-concentration' onChange={this.handleChange} min="0" max="2000" required/>
              <span>mg/dl</span>
            </div>
            <br/>
            <div>
              <label htmlFor="date">Date:</label>
              <input type="date" name='date' id='date' onChange={this.handleChange} required/>
              <br/>
              <br/>
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name="time" onChange={this.handleChange} required/>
            </div>
            <br/>
            <button type='submit'>Save</button>
            {this.state.message}
            {this.state.error}
        </form>
        </section>
        )
    }
}
