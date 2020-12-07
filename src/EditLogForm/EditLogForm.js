import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default class EditLogForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            date: '',
            meals: '',
            meds: '',
            glucose: '',
            editSuccess: false
            
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        console.log(value)
        const name = e.target.name;
        this.setState({
            [name]: value
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const logMetric = (this.state.glucose)
                            ?
                            'glucose'
                            : ((this.state.meds)
                                ?
                                'meds'
                                : 'meals')
        const logValue = this.state[logMetric]
        const date_time = moment(`${this.state.date} ${this.state.time}`).toISOString();
        console.log(date_time)
        const newLog = {
            [logMetric]: logValue,
            date_time
            
        }
        console.log(newLog)
        fetch(`http://localhost:8000/${logMetric}_logs/${this.props.userId}/${this.state.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newLog)
        })
        .then(() => {
            this.setState({
                editSuccess: true
            })
        })
    }



    componentDidMount() {
        const { id, user_id, date_time, ...logType } = this.props.selectedLog
        const date = moment(date_time).format('YYYY-MM-DD')
        
        const time = moment(date_time).format('HH:mm')
        const logMetric = Object.keys({...logType})[0]
        const logValue = this.props.selectedLog[logMetric]
        this.setState({
            id,
            date,
            time,
            [logMetric]: logValue
        })
    }

    render() {

        let renderEditLogs;
        if (this.props.selectedLog.glucose) {
            renderEditLogs = <div className="label-control">
            <label htmlFor="log-metric">Sugar Concentration(mg/dl):</label>
            <input type="number" name="glucose" id="log-metric" value={this.state.glucose} onChange={this.handleChange}/>
            </div>
        } else if (this.props.selectedLog.meds) {
            renderEditLogs = <div className="label-control">
            <label htmlFor="log-metric">Medications:</label>
            <input type="text" name="meds" id="log-metric" value={this.state.meds} onChange={this.handleChange}/>
        </div>
        } else if (this.props.selectedLog.meals) {
            renderEditLogs = <div className="label-control">
            <label htmlFor="log-metric">Meals:</label>
            <input type="text" name="meals" id="log-metric" value={this.state.meals} onChange={this.handleChange}/>
        </div>
        }

        
        const editSuccessMsg = (this.state.editSuccess) && (<p>You have successfully updated the log. You can go back to logdisplay by clicking on 'Cancel' button.</p>)
        
        return (
            <>
                
                
                <form className="edit-form" onSubmit={this.handleSubmit}>
                <h2>Edit Log for {this.state.date}</h2>
                    {renderEditLogs}   
                    <div className="label-control">
                        <label htmlFor="time">Time:</label>
                        <input type="time" name="time" id="time" value={this.state.time} onChange={this.handleChange}/>
                    </div>
                    <div className="buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.props.handleCancelEdit}>Cancel</button>
                    </div>
                    {editSuccessMsg}
                    
                 </form>
                 
            
                    
            </>
        )
    }
}
