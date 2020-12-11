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
    console.log('This works')
   this.setState(prevState => {
     return {
       visualize: !prevState.visualize
     }
   })
  }

  render() {
    const toRender = (!this.state.visualize)
                      ?
                      (<>
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

        <button
          type="button"
          onClick={this.handleClick}
          className="visualize-logs"
        >
          Show Chart
        </button>
        </>
        )
        :
        (
            <>
            <button
              type="button"
              onClick={this.handleClick}
              className="visualize-logs"
            >
              Hide Chart
            </button>
            <LineChart filteredLogs={this.props.filteredLogs} />
          </>
        )
    return (
      
       <>
        {toRender}
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
