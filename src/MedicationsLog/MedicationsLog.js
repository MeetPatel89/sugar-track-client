/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class MedicationsLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: '',
      date: '',
      time: '',
      meds: '',
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
    const userId = this.props.id;
    const meds = this.state.meds;

    const dateTimeMoment = moment(
      `${this.state.date} ${this.state.time}`,
      'YYYY-MM-DD HH:mm'
    );
    const dateTime = dateTimeMoment.toISOString();
    if (dateTimeMoment.isBefore(moment().subtract(7, 'days'))) {
      this.setState({
        error:
          'You are not allowed to log meds values for dates more than one week old',
        message: '',
      });
    } else if (dateTimeMoment.isAfter(moment())) {
      this.setState({
        error: 'You are not allowed to log meds values for future dates',
        message: '',
      });
    } else {
      fetch('http://localhost:8000/meds_logs')
        .then((res) => res.json())
        .then((medsLogs) => {
          const duplicateMedLog = medsLogs.find(
            (medLog) =>
              medLog.date_time === dateTime && medLog.user_id === userId
          );
          if (duplicateMedLog) {
            this.setState({
              error:
                'You have already logged a meds value for selected date and time',
              message: '',
            });
          } else {
            const newMed = {
              user_id: userId,
              meds,
              date_time: dateTime,
            };

            fetch('http://localhost:8000/meds_logs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newMed),
            })
              .then((res) => res.json())
              .then((medLog) => {
                this.setState({
                  message:
                    'You have successfully logged the meds value for selected date and time',
                  error: '',
                  date: '',
                  time: '',
                  meds: '',
                });
              });
          }
        });
    }
  };

  render() {
    return (
      <section className="med-regimens">
        <h2>Enter the medication regimens</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="label-control">
            <label htmlFor="meds">Medication:</label>
            <input
              type="text"
              id="meds"
              name="meds"
              aria-label="meds"
              aria-required="true"
              value={this.state.meds}
              placeholder="E.g. insulin, metformin, etc."
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
              aria-label="date for meal entry"
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
              name="time"
              aria-label="time for med entry"
              aria-required="true"
              value={this.state.time}
              onChange={this.handleChange}
              required
            />
          </div>

          <button className="med-log-submit" type="submit">
            Submit
          </button>
          <p style={{ color: '#2f004f', margin: '10px' }}>
            {this.state.message}
          </p>
          <p style={{ color: 'red' }}>{this.state.error}</p>
        </form>
      </section>
    );
  }
}

MedicationsLog.defaultProps = {
  id: 0,
};

MedicationsLog.propTypes = {
  id: PropTypes.number,
};
