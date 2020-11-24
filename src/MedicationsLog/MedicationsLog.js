import React, { Component } from 'react';

export default class MedicationsLog extends Component {
    constructor(props) {
      super(props);
      this.state = {
        message: '',
        error: ''
      }
    }

    handleChange = (e) => {
      const user_id = this.props.id;
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        [name]: value
      })
    }

    render() {
        return (
            <section>
        <h2>Enter the medication regimens</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="meds">Medication:</label>
          <input type="text" id="meds" name="meds" placeholder="E.g. Insulin or Metformin" onChange={this.handleChange} required/>
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