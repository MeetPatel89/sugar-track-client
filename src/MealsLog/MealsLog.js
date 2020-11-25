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
    console.log({
      meals,
      user_id,
      date_time
    })
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
      </section>
        )
    }
}