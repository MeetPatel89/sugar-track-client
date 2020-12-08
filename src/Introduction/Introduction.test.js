// make React available
import React from 'react';

// make the ReactDOM available necessary for rendering the component
import ReactDOM from 'react-dom';

// make the Introduction component available
import { BrowserRouter } from 'react-router-dom';
import Introduction from './Introduction';

// import BrowserRouter to wrap around App

describe('Introduction Component', () => {
  // this is the test case
  it('renders component without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    // render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(
      <BrowserRouter>
        <Introduction />
      </BrowserRouter>,
      div
    );

    // clean up code
    ReactDOM.unmountComponentAtNode(div);
  });
});
