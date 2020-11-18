import React, { Component } from 'react';

export default class MedicationsLog extends Component {
    render() {
        return (
            <section>
        <h2>Enter the medication regimens</h2>
        <form>
          <label htmlFor="pill">Medication:</label>
          <input type="text" id="pill" name="pill" placeholder="E.g. Insulin injection"/>
          <br/>
          <br/>
          <label htmlFor="dosage">Dosage:</label>
          <input type="text" id="dosage" name="dosage" placeholder="E.g. 10 mg"/>
          <br/>
          <br/>
          <label htmlFor="route">Route of administration:</label>
          <input type="text" id="route" name="route" placeholder="E.g. oral or intravenous injection"/>
          <br/>
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
          <button type="submit">Add</button>
        </form>
      </section>
        )
    }
}