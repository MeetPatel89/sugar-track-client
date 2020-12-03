import React, { Component } from 'react';
import HomePage from '../HomePage/HomePage';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        fetch(`http://localhost:8000/users/${username}`)
            .then(user => user.json())
            .then(user => {
            if (!user.length) {
                this.setState({
                    error: 'Please enter a correct username'
                })
            } else {
                if (user[0].password !== password) {
                    this.setState({
                        error: 'Please enter the correct password'
                    })} else {
                        this.setState({
                            isLogged: true,
                            ...user[0]
                        })
                    }
                
            }
        })
        
        
    }

    render() {
        return (

            <>
                {(this.state.isLogged)
                    ? <HomePage user={this.state.username} isLogged={this.state.isLogged} id={this.state.id} />
                    :  <div className="container">
                        <div className="form-container sign-in-container">
                        <h2>PLEASE SIGN IN</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="label-control">
                            <label htmlFor="username">Username:</label>
                                <input type="text" name="username" id="username" onChange={this.handleChange} required/>
                                </div>
                            
                            <div className="label-control">
                            <label htmlFor="password"> Password:</label>
                               
                                <input type="password" name="password" id="password" onChange={this.handleChange} required/>
                                </div>
                            
                            <button type="submit">LogIn</button>
                            <p>Don't have an account <button type="submit" onClick={this.props.handleClick}>Sign up</button></p>
                        </form>
                        {this.state.error}
                    </div>
                    </div>}
                

               
             </>)
             
            

        
            
           
        
            
    
}}