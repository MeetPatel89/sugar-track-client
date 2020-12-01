import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Header extends Component {

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
      

        return (
            <>
            <header className="logo">
            
            <h1><Link to='/'>SugarTrack</Link></h1>
            
            
            <hr/>
        </header>
            </>
        )
        
    }

    

   

    
}