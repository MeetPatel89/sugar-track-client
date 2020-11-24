import React, { Component } from 'react';

export default class MedicationsLog extends Component {
    render() {
        return (
            <section>
        <h2>Enter the medication regimens</h2>
        <form>
          <label htmlFor="pill">Medication:</label>
          <input type="text" id="pill" name="pill" placeholder="E.g. Insulin or Metformin" onChange={this.handleChange} required/>
          <br/>
          <br/>
          <div>
              <label htmlFor="date">Date:</label>
              <input type="date" name='date' id='date' onChange={this.handleChange} required/>
              <br/>
              <br/>
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name="time" onChange={this.handleChange} required/>
            </div>
            <br/>
          <button type="submit">Add</button>
        </form>
      </section>
        )
    }
}