import React, { Component } from 'react';

export default class SugarLog extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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
        <form className='sugar-levels'>
            <div>
              <label htmlFor="sugar-concentration">Sugar Concentration</label>
              <input placeholder='sugar level' type="text" name='sugar-level' id='sugar-concentration' onChange={this.handleChange} required/>
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
            
        </form>
        </section>
        )
    }
}
