import React, { Component } from 'react';

export default class LogTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <table className="log-display-table">
                
                    <thead>
                        <tr>
                    <th>Time (24-hour)</th>
                    <th>Log Metric</th>
                    <th>Log Value</th>
                    </tr>
                    </thead>
                <tbody>
                {this.props.renderLogs}
                </tbody>
                
            </table>
        )
    }
}