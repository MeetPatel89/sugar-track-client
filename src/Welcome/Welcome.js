import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedOut: false
        }
    }

    handleClick = () => {
        this.setState({
            isLoggedOut: true
        })
    }

    render() {
        let welcomeMsg;
    if (this.props.user) {
        welcomeMsg = <p>Welcome {this.props.user}</p>
    }

        return (
            <>
            <div className="welcome">
            
            
            <p>Welcome {this.props.user}</p>
            
            <hr/>
        </div>
            </>
        )
        
    }

    

   

    
}