// make React available
import React from 'react';

// make the ReactDOM available necessary for rendering the component
import ReactDOM from 'react-dom';

// make the App component available
import SignIn from './SignIn';

// import BrowserRouter to wrap around App
import { BrowserRouter } from 'react-router-dom';

// this is the test case
it('renders component without crashing', () => {
    // first create a DOM element to render the component into
    const div = document.createElement('div');

    // render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(<BrowserRouter><SignIn/></BrowserRouter>, div);

    // clean up code
    ReactDOM.unmountComponentAtNode(div);
});