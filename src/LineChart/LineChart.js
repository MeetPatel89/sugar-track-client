import React, { Component } from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [
          '00:00',
          '01:15',
          '02:00',
          '03:20',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '23:59',
        ],
        datasets: [
          {
            label: 'Blood Sugar Levels',
            data: [1, 3, 4, 2, 1, 4, 2],
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                format: 'HH:mm',
                unit: 'hour',
                unitStepSize: 1,
                displayFormats: {
                  minute: 'HH:mm',
                  hour: 'HH:mm',
                  min: '00:00',
                  max: '23:59',
                },
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true, // minimum value will be 0.
              },
            },
          ],
        },
      },
    };
  }

  componentDidMount() {
    if (this.props.filteredLogs) {
      const timeData = this.props.filteredLogs.map((filteredLog) => {
        if (Object.keys(filteredLog).includes('glucose')) {
          return moment(filteredLog.date_time).format('HH:mm');
        }
        return null;
      });
    }
  }

  render() {
    return (
      <div className="chart">
        <Line data={this.state.data} options={this.state.options} />
      </div>
    );
  }
}
