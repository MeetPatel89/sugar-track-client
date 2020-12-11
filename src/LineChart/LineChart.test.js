// make React available
import React from 'react';
import 'jest-canvas-mock';

// make the ReactDOM available necessary for rendering the component
import ReactDOM from 'react-dom';

// make the EditForm component available
import LineChart from './LineChart';

describe('LineChart Component', () => {
  // this is the test case
  it('renders component without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    // render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(
      <LineChart
        data={{
          labels: ['13:55', '20:40'],
          datasets: [
            {
              label: 'Blood Sugar Level',
              data: [100, 230],
            },
          ],
        }}
      />,
      div
    );

    // clean up code
    ReactDOM.unmountComponentAtNode(div);
  });
});
