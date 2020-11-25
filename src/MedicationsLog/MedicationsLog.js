import React, { Component } from 'react';
import moment from 'moment';

export default class MedicationsLog extends Component {
    constructor(props) {
      super(props);
      this.state = {
        message: '',
        error: ''
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
      console.log(this.state.date)
      console.log(this.state.time)
    
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
            
          })
      }
     
    }

    render() {
        return (
            <section>
        <h2>Enter the medication regimens</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="meds">Medication:</label>
          <input type="text" id="meds" name="meds" placeholder="E.g. Insulin or Metformin" onChange={this.handleChange} required/>
          <br/>
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
          <button type="submit">Add</button>
        </form>
        {this.state.message}
        {this.state.error}
      </section>
        )
    }
}