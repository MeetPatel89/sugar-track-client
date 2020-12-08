/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class SugarLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: '',
      date: '',
      glucose: '',
      time: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const dateTimeMoment = moment(
      `${this.state.date} ${this.state.time}`,
      'YYYY-MM-DD HH:mm'
    );
    const dateTime = dateTimeMoment.toISOString();
    const userId = this.props.id;
    if (dateTimeMoment.isBefore(moment().subtract(7, 'days'))) {
      this.setState({
        error:
          'You are not allowed to log glucose values for dates which are more than one week old',
      });
    } else if (dateTimeMoment.isAfter(moment())) {
      this.setState({
        error:
          'You are not allowed to log glucose values for dates in the future',
        message: '',
      });
    } else {
      const newGlucoseLog = {
        user_id: this.props.id,
        date_time: dateTime,
        glucose: this.state.glucose,
      };

      fetch('http://localhost:8000/glucose_logs')
        .then((res) => res.json())
        .then((glucoseLogs) => {
          const duplicateGlucoseLog = glucoseLogs.find(
            (glucoseLog) =>
              glucoseLog.date_time === newGlucoseLog.date_time &&
              glucoseLog.user_id === userId
          );

          if (duplicateGlucoseLog) {
            this.setState({
              error:
                'You have already logged a glucose value for the selected date and time',
              message: '',
            });
          } else {
            fetch('http://localhost:8000/glucose_logs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newGlucoseLog),
            })
              .then((newGlucoseLog) => newGlucoseLog.json())
              .then(() => {
                this.setState({
                  message: 'You have successfully logged a glucose value',
                  error: '',
                  glucose: '',
                  date: '',
                  time: '',
                });
              });
          }
        });
    }
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <section className="sugar-levels">
        <h2>Enter Sugar Levels</h2>
        <form className="sugar-levels" onSubmit={this.handleSubmit}>
          <div className="label-control">
            <label htmlFor="sugar-concentration">Sugar Level (mg/dl)</label>
            <input
              placeholder="For e.g. 120"
              type="number"
              name="glucose"
              value={this.state.glucose}
              id="sugar-concentration"
              aria-label="sugar-concentration"
              aria-required="true"
              aria-describedby="sugarConstraint"
              aria-invalid="true"
              onChange={this.handleChange}
              min="0"
              max="2000"
              required
            />
            <div id="sugarConstraint">
              Sugar level should be between 0 and 2000.
            </div>
          </div>

          <div className="label-control">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              id="date"
              aria-label="date for sugar entry"
              aria-required="true"
              aria-describedby="dateConstraint"
              aria-invalid="true"
              value={this.state.date}
              onChange={this.handleChange}
              required
            />
            <div id="dateConstraint">
              Future dates as well as dates from more than a week in the past
              are not allowed.
            </div>
          </div>
          <div className="label-control">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={this.state.time}
              name="time"
              aria-label="time for sugar entry"
              aria-required="true"
              onChange={this.handleChange}
              required
            />
          </div>

          <button className="sugar-log-submit" type="submit">
            Submit
          </button>
          <div className="successMessage">{this.state.message}</div>
          <div className="errorMessage">{this.state.error}</div>
        </form>
      </section>
    );
  }
}

SugarLog.defaultProps = {
  id: 0,
};

SugarLog.propTypes = {
  id: PropTypes.number,
};
