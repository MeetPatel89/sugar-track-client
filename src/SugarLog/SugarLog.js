import React, { Component } from 'react';

export default class SugarLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newGlucoseLog = {
      ...this.state
    };
    delete newGlucoseLog['message'];
    fetch('http://localhost:8000/glucose_logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGlucoseLog)
    })
    .then(newGlucoseLog => newGlucoseLog.json())
    .then(newGlucoseLog => {
      console.log(newGlucoseLog);
      this.setState({
        message: 'You have successfully logged a glucose value'
      })
    })
    
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      user_id: this.props.id
    })
  }

    render() {
        return (
            <section>
          <h2>Enter Sugar Levels</h2>
        <form className='sugar-levels' onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="sugar-concentration">Sugar Concentration</label>
              <input placeholder='sugar level' type="number" name='glucose' id='sugar-concentration' onChange={this.handleChange} required/>
              <span>mg/dl</span>
            </div>
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
            <button type='submit'>Save</button>
            {this.state.message}
        </form>
        </section>
        )
    }
}
