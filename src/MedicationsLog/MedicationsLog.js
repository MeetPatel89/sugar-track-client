import React, { Component } from 'react';
import moment from 'moment';

export default class MedicationsLog extends Component {
    constructor(props) {
      super(props);
      this.state = {
        message: '',
        error: '',
        date: '',
        time: '',
        meds: ''
      }
    }

    handleChange = (e) => {
      
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        [name]: value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const user_id = this.props.id;
      const meds = this.state.meds;
      
    
      const date_time_moment = moment(`${this.state.date} ${this.state.time}`, 'YYYY-MM-DD HH:mm');
      console.log(date_time_moment.isBefore(moment().subtract(7, 'days')))
      const date_time = date_time_moment.toISOString();
      if (date_time_moment.isBefore(moment().subtract(7, 'days'))) {
        this.setState({
          error: 'You are not allowed to log meds values for dates more than one week old',
          message: ''
        })
      } else if (date_time_moment.isAfter(moment())) {
          this.setState({
            error: 'You are not allowed to log meds values for future dates'
          })
      } else {

        fetch('http://localhost:8000/meds_logs')
        .then(res => res.json())
        .then(medsLogs => {
          const duplicateMedLog = medsLogs.find(medLog => medLog.date_time === date_time && medLog.user_id === user_id)
          console.log(duplicateMedLog);
          if (duplicateMedLog) {
            this.setState({
              error: 'You have already logged a meds value for selected date and time',
              message: ''
            })
          } else {
            const newMed = {
              user_id,
              meds,
              date_time
            }

            fetch('http://localhost:8000/meds_logs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newMed)

            })
            .then(res => res.json())
            .then(medLog => {
              this.setState({
                message: 'You have successfully logged the meds value for selected date and time',
                error: '',
                date: '',
                time: '',
                meds: ''
              })
              
            })
            
          }
        })
      }
     
    }

    render() {
        return (
            <section>
        <h2>Enter the medication regimens</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="label-control">
          <label htmlFor="meds">Medication:</label>
          <input type="text" id="meds" name="meds" value={this.state.meds} placeholder="E.g. insulin, metformin, etc." onChange={this.handleChange} required/>
          </div>
          
            <div className="label-control">
              <label htmlFor="date">Date:</label>
              <input type="date" name="date" id="date" value={this.state.date} onChange={this.handleChange} required/>
              </div>
              <div className="label-control">
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name="time" value={this.state.time} onChange={this.handleChange} required/>
            </div>
            
          <button type="submit">Add</button>
          <p style={{color: "#2f004f", margin: "10px"}}>{this.state.message}</p>
          <p style={{color: "red"}}>{this.state.error}</p>
        </form>
        
        
      </section>
        )
    }
}