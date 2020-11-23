import React, { Component } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

export default class LogDisplay extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('Hello World!')
    }
    render() {
        return (
            <>
            
            
            <section>
            <h2>Blood Sugar Levels Log</h2>
            <ul>
              <li>Placeholder for date</li>
              <li>Placeholder for date</li>
              <li>Placeholder for date</li>
              <li>Placeholder for date</li>
            </ul>
            <button type="submit">Add</button>
        
    
    
            </section>
            </>
        )
    }
}