/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LogTable.css';

export default class LogTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="table-content">
          <table id="log-display-table">
            <thead>
              <tr>
                <th>Time (24-hour)</th>
                <th>Log Metric</th>
                <th>Log Value</th>
              </tr>
            </thead>
            <tbody id="table-body">{this.props.renderLogs}</tbody>
          </table>
        </div>
        <button type="button" className="visualize-logs">
          Visualize
        </button>
      </>
    );
  }
}

LogTable.defaultProps = {
  renderLogs: [],
};

LogTable.propTypes = {
  renderLogs: PropTypes.array,
};
