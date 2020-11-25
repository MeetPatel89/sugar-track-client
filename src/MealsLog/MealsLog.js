import React, { Component } from 'react';
import moment from 'moment';

export default class MealsLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      message: ''
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
    const meals = this.state.meals;
    const user_id = this.props.id;
    const date_time_moment = moment(`${this.state.date} ${this.state.time}`, 'YYYY-MM-DD HH:mm');
    const date_time = date_time_moment.toISOString();

    if (date_time_moment.isBefore(moment().subtract(7, 'days'))) {
      this.setState({
        error: 'You are not allowed to log meals value for dates more than one week old',
        message: ''
      })
    } else if (date_time_moment.isAfter(moment())) {
      this.setState({
        error: 'You are not allowed to log meals values for future dates',
        message: ''
      })
    } else {
      fetch('http://localhost:8000/meals_logs')
      .then(res => res.json())
      .then(mealsLogs => {
        const duplicateMealsLog = mealsLogs.find(mealsLog => mealsLog.date_time === date_time);
        if (duplicateMealsLog) {
          this.setState({
            error: 'You have already logged meals value for the selected date and time',
            message: ''
          })
        } else {
          const newMealLog = {
            meals,
            user_id,
            date_time
          }
          fetch('http://localhost:8000/meals_logs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMealLog)
          })
          .then(res => {
            this.setState({
              error: '',
              message: 'You have successfully logged the meals value'
            })
            return res.json()

          })
          .then(mealsLog => console.log(mealsLog))
        }
      })
    }

    
  }

    render() {
        return (
            <section>
        <header>
            <h3>Enter Meal Regimens</h3>
        </header>
        <form className="meals_log" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="meal">Meal:</label>
              <input placeholder='Egg Sandwich' type="text" name="meals" id="meals" onChange={this.handleChange} required/>
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
            <button type='submit'>Add</button>
        </form>
        {this.state.error}
        {this.state.message}
      </section>
        )
    }
}