import React, { Component } from 'react';

export default class SugarLog extends Component {
    render() {
        return (
            <section>
          <h2>Enter Sugar Levels</h2>
        <form className='sugar-levels'>
            <div>
              <label htmlFor="sugar-concentration">Sugar Concentration</label>
              <input placeholder='sugar level' type="text" name='sugar-level' id='sugar-concentration' />
              <span>mg/dl</span>
            </div>
            <br/>
            <div>
              <label htmlFor="date">Date:</label>
              <input type="date" name='date' id='date' />
              <br/>
              <br/>
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name="time"/>
            </div>
            <br/>
            <button type='submit'>Save</button>
            
        </form>
        </section>
        )
    }
}
