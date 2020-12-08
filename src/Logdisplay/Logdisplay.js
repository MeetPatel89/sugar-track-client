/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './LogDisplay.css';
import LogTable from '../LogTable/LogTable';
import EditLogForm from '../EditLogForm/EditLogForm';

export default class LogDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLogs: false,
      displayError: false,
      year: '',
      month: '',
      day: '',
      editForm: false,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8000/logs/${this.props.id}`)
      .then((res) => res.json())
      .then((logs) => {
        this.setState({
          logs,
        });
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
    const year = this.state.year;
    const month = this.state.month;
    const day = this.state.day;

    if (year && month && day) {
      const date = `${month} ${day} ${year}`;

      this.setState((prevState) => {
        const filteredLogs = prevState.logs.filter(
          (log) => moment(log.date_time).format('MMM DD YYYY') === date
        );

        return {
          displayLogs: true,
          displayError: false,
          filteredLogs,
        };
      });
    } else {
      this.setState({
        displayLogs: false,
        displayError: true,

        month: '',
        day: '',
      });
    }
  };

  handleMouseOver = (e) => {
    const tableRow = e.target.parentElement;
    tableRow.style.backgroundColor = 'darkgray';
  };

  handleMouseOut = (e) => {
    const tableRow = e.target.parentElement;

    tableRow.style.backgroundColor = '';
  };

  handleClick = (e) => {
    const editRow = e.target.parentElement.nextSibling.firstChild;

    editRow.setAttribute('class', '');
  };

  handleCancel = (e) => {
    const editRow = e.target.parentElement;
    editRow.setAttribute('class', 'hidden');
  };

  handleCancelEdit = () => {
    this.setState({
      editForm: false,
    });
    fetch(`http://localhost:8000/logs/${this.props.id}`)
      .then((res) => res.json())
      .then((logs) => {
        this.setState((prevState) => {
          const year = this.state.year;
          const month = this.state.month;
          const day = this.state.day;

          const date = `${month} ${day} ${year}`;
          const filteredLogs = logs.filter(
            (log) => moment(log.date_time).format('MMM DD YYYY') === date
          );

          return {
            logs,
            filteredLogs,
          };
        });
      });
  };

  handleAfterEdit = () => {
    fetch(`http://localhost:8000/logs/${this.props.id}`)
      .then((res) => res.json())
      .then((logs) => {
        const filteredLogs = this.state.filteredLogs.map((log) => {
          if (log.id === this.state.selectedLog.id) {
            if (Object.keys(log).includes(this.state.logMetric)) {
              return null;
            }
          } else {
            return log;
          }
          return null;
        });
      });
  };

  handleEdit = (e) => {
    const DeleteRow =
      e.target.parentElement.parentElement.previousElementSibling;
    const idAttribute = DeleteRow.getAttribute('id');
    const id = idAttribute.split(' ')[0];
    const logMetric = idAttribute.split(' ')[1];

    this.setState((prevState) => {
      const selectedLog = prevState.filteredLogs.find(
        (log) => log.id === parseInt(id) && Object.keys(log).includes(logMetric)
      );
      return {
        selectedLog,
        editForm: true,
        logMetric,
      };
    });
  };

  handleDelete = (e) => {
    const DeleteRow =
      e.target.parentElement.parentElement.previousElementSibling;
    const idAttribute = DeleteRow.getAttribute('id');
    const id = idAttribute.split(' ')[0];
    const logMetric = idAttribute.split(' ')[1];
    const filterByIdAndMetric = (log, id, logMetric) => {
      if (log.id === parseInt(id)) {
        if (Object.keys(log).includes(logMetric)) {
          return null;
        }
      } else {
        return log;
      }
      return null;
    };

    fetch(`http://localhost:8000/${logMetric}_logs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    }).then(
      this.setState((prevState) => {
        const postDeleteLogs = prevState.filteredLogs.filter((log) =>
          filterByIdAndMetric(log, id, logMetric)
        );
        return {
          filteredLogs: postDeleteLogs,
        };
      })
    );
  };

  render() {
    let loggedDates;
    this.state.logs &&
      (loggedDates = this.state.logs.map((log) => {
        const loggedDate = moment(log.date_time).format('MMM DD YYYY');
        return loggedDate;
      }));

    const uniqueLoggedDates = [...new Set(loggedDates)];
    const uniqueLoggedMonths = [];
    const dropDownMonths = uniqueLoggedDates.map((uniqueLoggedDate, i) => {
      const year = moment(uniqueLoggedDate).format('YYYY');
      const uniqueLoggedMonth = moment(uniqueLoggedDate).format('MMM');
      if (
        !uniqueLoggedMonths.includes(uniqueLoggedMonth) &&
        year === this.state.year
      ) {
        uniqueLoggedMonths.push(uniqueLoggedMonth);
        return (
          <option key={i} value={uniqueLoggedMonth}>
            {uniqueLoggedMonth}
          </option>
        );
      }
      return null;
    });

    const uniqueLoggedYears = [];
    const dropDownYears = uniqueLoggedDates.map((uniqueLoggedDate, i) => {
      const uniqueLoggedYear = moment(uniqueLoggedDate).format('YYYY');
      if (!uniqueLoggedYears.includes(uniqueLoggedYear)) {
        uniqueLoggedYears.push(uniqueLoggedYear);
        return (
          <option key={i} value={uniqueLoggedYear}>
            {uniqueLoggedYear}
          </option>
        );
      }
      return null;
    });

    const uniqueLoggedDays = [];
    const dropDownDays = uniqueLoggedDates.map((uniqueLoggedDate, i) => {
      const uniqueLoggedYear = moment(uniqueLoggedDate).format('YYYY');
      const uniqueLoggedMonth = moment(uniqueLoggedDate).format('MMM');
      const uniqueLoggedDay = moment(uniqueLoggedDate).format('DD');
      if (
        !uniqueLoggedDays.includes(uniqueLoggedDay) &&
        uniqueLoggedMonth === this.state.month &&
        uniqueLoggedYear === this.state.year
      ) {
        uniqueLoggedDays.push(uniqueLoggedDay);
        return (
          <option key={i} value={uniqueLoggedDay}>
            {uniqueLoggedDay}
          </option>
        );
      }
      return null;
    });

    let renderLogs;
    const modifyRow = (
      <tr className="modify-row">
        <td colSpan="3" className="hidden">
          <button
            type="button"
            className="edit-button"
            onClick={this.handleEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={this.handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={this.handleCancel}
          >
            Cancel
          </button>
        </td>
      </tr>
    );

    if (this.state.displayLogs) {
      renderLogs = this.state.filteredLogs.map((log) => {
        const dateTime = moment(log.date_time).format('HH:mm');
        if (log.glucose) {
          return (
            <Fragment key={`${log.id}glu`}>
              <tr
                id={`${log.id} glucose`}
                onMouseOver={this.handleMouseOver}
                onFocus={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onBlur={this.handleMouseOut}
                onClick={this.handleClick}
                className="log-display-list-item"
              >
                <td>{dateTime}</td>
                <td>Glucose</td>
                <td>{log.glucose}</td>
              </tr>

              {modifyRow}
            </Fragment>
          );
        }
        if (log.meds) {
          return (
            <Fragment key={`${log.id}med`}>
              <tr
                id={`${log.id} meds`}
                onMouseOver={this.handleMouseOver}
                onFocus={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onBlur={this.handleMouseOut}
                onClick={this.handleClick}
                className="log-display-list-item"
              >
                <td>{dateTime}</td>
                <td>Medication</td>
                <td>{log.meds}</td>
              </tr>
              {modifyRow}
            </Fragment>
          );
        }
        return (
          <Fragment key={`${log.id}meal`}>
            <tr
              id={`${log.id} meals`}
              onMouseOver={this.handleMouseOver}
              onFocus={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}
              onBlur={this.handleMouseOut}
              onClick={this.handleClick}
              className="log-display-list-item"
            >
              <td>{dateTime}</td>
              <td>Meal</td>
              <td>{log.meals}</td>
            </tr>
            {modifyRow}
          </Fragment>
        );
      });
    }

    return (
      <>
        {this.state.editForm ? (
          <EditLogForm
            selectedLog={this.state.selectedLog}
            handleEditSubmit={this.handleEditSubmit}
            handleCancelEdit={this.handleCancelEdit}
            userId={this.props.id}
            handleAfterEdit={this.handleAfterEdit}
          />
        ) : (
          <main className="main-container">
            <section className="log-display">
              <form className="log-display-form" onSubmit={this.handleSubmit}>
                <h2>Display logs for</h2>
                <div className="select-menus">
                  <div className="label-control-select">
                    <label htmlFor="year">Select Year</label>
                    <select
                      value={this.state.year}
                      name="year"
                      id="year"
                      aria-label="select year for log display"
                      aria-required="true"
                      aria-describedby="selectionError"
                      onChange={this.handleChange}
                    >
                      <option value="">Year</option>

                      {dropDownYears}
                    </select>
                  </div>
                  <div className="label-control-select">
                    <label htmlFor="month">Select Month</label>
                    <select
                      value={this.state.month}
                      name="month"
                      id="month"
                      aria-label="select month for log display"
                      aria-required="true"
                      aria-describedby="selectionError"
                      onChange={this.handleChange}
                    >
                      <option value="">Month</option>
                      {dropDownMonths}
                    </select>
                  </div>
                  <div className="label-control-select">
                    <label htmlFor="day">Select Day</label>
                    <select
                      value={this.state.day}
                      name="day"
                      id="day"
                      aria-required="true"
                      aria-label="select day for log display"
                      aria-describedby="selectionError"
                      aria-invalid="true"
                      onChange={this.handleChange}
                    >
                      <option value="">Day</option>
                      {dropDownDays}
                    </select>
                  </div>
                  {this.state.displayError && (
                    <div className="errorMessage" id="selectionError">
                      Please select a year, month and day from the above
                      dropdown to display logs for that date!
                    </div>
                  )}
                </div>
                <button className="display-logs" type="submit">
                  Display logs
                </button>
                {this.state.displayLogs && <LogTable renderLogs={renderLogs} />}
              </form>
            </section>
          </main>
        )}
      </>
    );
  }
}

LogDisplay.propTypes = {
  id: PropTypes.number.isRequired,
};
