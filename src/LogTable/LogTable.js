/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import LineChart from '../LineChart/LineChart';
import PropTypes from 'prop-types';
import './LogTable.css';

export default class LogTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visualize: false
    };
  }

  componentDidMount() {

  }

  handleClick = () => {
    this.setState({
      visualize: true
    })
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
        {!this.state.visualize && (
          <button type="button" onClick={this.handleClick} className="visualize-logs">
          Show Chart
        </button>
        )}
        
        {this.state.visualize && (
          <>
          <button type="button" onClick={this.handleClick} className="visualize-logs">
            Hide Chart
          </button>
          <LineChart filteredLogs={this.state.filteredLogs} />
          </>
        )}
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
