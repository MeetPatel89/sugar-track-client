import React, { Component } from 'react';

export default class MealsLog extends Component {
    render() {
        return (
            <section>
        <header>
            <h3>Enter Meal Regimens</h3>
        </header>
        <form className='signup-form'>
            <div>
              <label htmlFor="meal">Meal:</label>
              <input placeholder='Egg Sandwich' type="text" name='sandwich' id='sandwich' required/>
            </div>
            <br/>
            <div>
              <label htmlFor="date">Date:</label>
              <input type="date" name='date' id='date' required/>
              <br/>
              <br/>
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name="time" required/>
            </div>
            <br/>
            <button type='submit'>Add</button>
        </form>
      </section>
        )
    }
}