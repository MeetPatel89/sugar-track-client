import React, { Component } from 'react';
import moment from 'moment';

export default class CondensedTableLog extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        
       
        const loggedDates = this.props.logs.map(log => {
            const loggedDate = moment(log.date_time).format('MMM DD YYYY');
            return loggedDate
        })
        console.log(loggedDates);
        const uniqueLoggedDates = [...new Set(loggedDates)];
        console.log(uniqueLoggedDates);
        const uniqueLoggedMonths = [];
        const dropDownMonths = uniqueLoggedDates.map((uniqueLoggedDate, i) => {
            const year = moment(uniqueLoggedDate).format('YYYY');
            let uniqueLoggedMonth = moment(uniqueLoggedDate).format('MMM');
            if (!uniqueLoggedMonths.includes(uniqueLoggedMonth) && year === this.state.year) {
                uniqueLoggedMonths.push(uniqueLoggedMonth);
                return <option key={i} value={uniqueLoggedMonth}>{uniqueLoggedMonth}</option>
            } 
            return null;
        });
        return (
            <>
                
            </>
        )
    }
}