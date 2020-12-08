/* eslint-disable eqeqeq */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class EditLogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      date: '',
      meals: '',
      meds: '',
      glucose: '',
      editSuccess: false,
      editError: false,
    };
  }

  componentDidMount() {
    const dateTime = this.props.selectedLog.date_time;
    const { id } = this.props.selectedLog;
    const selectedLogKeys = Object.keys(this.props.selectedLog);
    const logMetric = selectedLogKeys.find(
      (key) => key !== 'id' && key !== 'user_id' && key !== 'date_time'
    );
    const date = moment(dateTime).format('YYYY-MM-DD');

    const time = moment(dateTime).format('HH:mm');
    const logValue = this.props.selectedLog[logMetric];
    this.setState({
      id,
      date,
      time,
      [logMetric]: logValue,
    });
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const logMetric = this.state.glucose
      ? 'glucose'
      : this.state.meds
      ? 'meds'
      : 'meals';
    const logValue = this.state[logMetric];
    const dateTime = moment(
      `${this.state.date} ${this.state.time}`
    ).toISOString();
    if (
      logValue == this.props.selectedLog[logMetric] &&
      dateTime == this.props.selectedLog.date_time
    ) {
      this.setState({
        editError: true,
        editSuccess: false,
      });
    } else {
      const newLog = {
        [logMetric]: logValue,
        date_time: dateTime,
      };
      fetch(
        `http://localhost:8000/${logMetric}_logs/${this.props.userId}/${this.state.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(newLog),
        }
      ).then(() => {
        this.setState({
          editSuccess: true,
          editError: false,
        });
      });
    }
  };

  render() {
    let renderEditLogs;
    if (this.props.selectedLog.glucose) {
      renderEditLogs = (
        <div className="label-control">
          <label htmlFor="log-metric">Sugar Level(mg/dl):</label>
          <input
            type="number"
            name="glucose"
            id="log-metric"
            aria-label="log-metric to edit"
            aria-describedby="editError"
            aria-invalid="true"
            value={this.state.glucose}
            onChange={this.handleChange}
          />
        </div>
      );
    } else if (this.props.selectedLog.meds) {
      renderEditLogs = (
        <div className="label-control">
          <label htmlFor="log-metric">Medications:</label>
          <input
            type="text"
            name="meds"
            id="log-metric"
            aria-label="log-metric to edit"
            aria-describedby="editError"
            aria-invalid="true"
            value={this.state.meds}
            onChange={this.handleChange}
          />
        </div>
      );
    } else if (this.props.selectedLog.meals) {
      renderEditLogs = (
        <div className="label-control">
          <label htmlFor="log-metric">Meals:</label>
          <input
            type="text"
            name="meals"
            id="log-metric"
            aria-label="log-metric to edit"
            aria-describedby="editError"
            aria-invalid="true"
            value={this.state.meals}
            onChange={this.handleChange}
          />
        </div>
      );
    }

    const editSuccessMsg = this.state.editSuccess && (
      <div className="successMessage">
        You have successfully updated the log. You can go back to logdisplay by
        clicking on 'Cancel' button.
      </div>
    );

    const editErrorMsg = this.state.editError && (
      <div className="errorMessage" id="editError">
        You have to edit at least one of the fields from the above two.
      </div>
    );

    return (
      <section className="edit-form-container">
        <h2>
          Edit Log for&nbsp;
          {this.state.date}
        </h2>
        <form className="edit-form" onSubmit={this.handleSubmit}>
          {renderEditLogs}
          <div className="label-control">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              name="time"
              id="time"
              aria-label="time entry to edit"
              aria-describedby="editError"
              aria-invalid="true"
              value={this.state.time}
              onChange={this.handleChange}
            />
            {editSuccessMsg}
            {editErrorMsg}
          </div>

          <button type="submit">Submit</button>
          <button type="button" onClick={this.props.handleCancelEdit}>
            Cancel
          </button>
        </form>
      </section>
    );
  }
}

EditLogForm.defaultProps = {
  selectedLog: {},
  handleCancelEdit() {
    return 'HandleCancelEdit function';
  },
  userId: 0,
};

EditLogForm.propTypes = {
  selectedLog: PropTypes.object.isRequired,
  handleCancelEdit: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
