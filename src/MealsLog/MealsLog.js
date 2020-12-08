import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class MealsLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      message: '',
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const meals = this.state.meals;
    const userId = this.props.id;
    const dateTimeMoment = moment(
      `${this.state.date} ${this.state.time}`,
      'YYYY-MM-DD HH:mm'
    );
    const dateTime = dateTimeMoment.toISOString();

    if (dateTimeMoment.isBefore(moment().subtract(7, 'days'))) {
      this.setState({
        error:
          'You are not allowed to log meals value for dates more than one week old',
        message: '',
      });
    } else if (dateTimeMoment.isAfter(moment())) {
      this.setState({
        error: 'You are not allowed to log meals values for future dates',
        message: '',
      });
    } else {
      fetch('http://localhost:8000/meals_logs')
        .then((res) => res.json())
        .then((mealsLogs) => {
          const duplicateMealsLog = mealsLogs.find(
            (mealsLog) =>
              mealsLog.date_time === dateTime && mealsLog.user_id === userId
          );
          if (duplicateMealsLog) {
            this.setState({
              error:
                'You have already logged meals value for the selected date and time',
              message: '',
            });
          } else {
            const newMealLog = {
              meals,
              user_id: userId,
              date_time: dateTime,
            };
            fetch('http://localhost:8000/meals_logs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newMealLog),
            })
              .then((res) => {
                this.setState({
                  error: '',
                  message: 'You have successfully logged the meals value',
                  meals: '',
                  time: '',
                  date: '',
                });
                return res.json();
              })
              .then((mealsLog) => mealsLog);
          }
        });
    }
  };

  render() {
    return (
      <section className="meals">
        <header>
          <h2>Enter Meal Regimens</h2>
        </header>
        <form className="meals_log" onSubmit={this.handleSubmit}>
          <div className="label-control">
            <label htmlFor="meal">Meal:</label>
            <input
              placeholder="Egg Sandwich"
              type="text"
              name="meals"
              id="meals"
              value={this.state.meals}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="label-control">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              id="date"
              value={this.state.date}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="label-control">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={this.state.time}
              onChange={this.handleChange}
              required
            />
          </div>

          <button className="meal-log-submit" type="submit">
            Submit
          </button>
          <p style={{ color: 'red' }}>{this.state.error}</p>
          <p style={{ color: '#2f004f', margin: '10px' }}>
            {this.state.message}
          </p>
        </form>
      </section>
    );
  }
}

MealsLog.propTypes = {
  id: PropTypes.number.isRequired,
};
