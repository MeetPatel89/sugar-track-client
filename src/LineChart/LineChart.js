import React, { Component } from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.filteredLogs) {
      const glucoseLogs = this.props.filteredLogs.filter((filteredLog) =>
        Object.keys(filteredLog).includes('glucose')
      );

      const timeData = glucoseLogs.map((glucoseLog) =>
        moment(glucoseLog.date_time).format('HH:mm')
      );

      const glucoseData = glucoseLogs.map((glucoseLog) => glucoseLog.glucose);
      this.setState({
        data: {
          labels: timeData,
          datasets: [
            {
              label: 'Blood Sugar Level',
              data: glucoseData,
              borderColor: '#FF4B2B',
              pointBackgroundColor: 'black',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
                display: true,
                ticks: {
                  beginAtZero: true,
                  suggestedMin: 0,
                  fontSize: 20,
                  fontColor: 'black',
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Time(24-hr)',
                  fontColor: 'black',
                  fontSize: 20,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                color: 'black',
                ticks: {
                  suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                  // OR //
                  beginAtZero: true, // minimum value will be 0.
                  fontSize: 15,
                  fontColor: 'black',
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Blood Sugar Levels',
                  fontColor: 'black',
                  fontSize: 15,
                },
              },
            ],
          },
        },
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
