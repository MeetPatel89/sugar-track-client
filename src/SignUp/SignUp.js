import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import Header from '../Header/Header';

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signIn: false
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
       
}

    handleClick = () => {
        this.setState({
            signIn: true
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const passwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        
        if (!this.state.password.match(passwd)) {
            this.setState({
                error: 'Password should contain at least one uppercase letter, one lowercase letter and one numeric digit'
            })
        } else {
            if (this.state.password !== this.state['confirm-password']) {
                this.setState({
                    error: '"Password" and "Confirm Password" fields should match each other'
                })
            } else {
                this.setState({
                    error: ''
                })
            }
        }

        const { fullname, username, password } = this.state;
        const newUser = {
            fullname,
            username,
            password
        }

        console.log(newUser);

       fetch('http://localhost:8000/users', {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json',
          },
           body: JSON.stringify(newUser) 
       })
       .then(user => user.json())
       .then(data => {
           this.setState({
               'signIn': true
           })
       })
       .catch(error => console.error({'error': error})) 


    }

    render() {

      

        return (
        
               
                    <>
                    
                    
                    <div class="container">
                    <div className="form-container sign-up-container">
                    <h2>CREATE ACCOUNT</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Fullname:
                            <input type="text" name="fullname" onChange={this.handleChange} required/>
                        </label>
                        <br/>
                        <label>
                            Username:
                            <input type="text" name="username" onChange={this.handleChange} required/>
                        </label>
                        <br/>
                        <label>
                            Password:
                            <input type="password" name="password" onChange={this.handleChange} required/>
                        </label>
                        <br/>
                        <label>
                            Confirm Password:       
                            <input type="password" name="confirm-password" onChange={this.handleChange} required/>
                        </label>
                        <br/>
                        
                        <button type="submit">Sign Up</button>
                        <p>Already have an account? <button type="submit" onClick={this.props.handleClick}>Sign In</button></p>
                        {this.state.error}
                    </form>
                    
                    </div>
                    
                     
                </div> 
                 </>       
                
                
                    
                
            
        );

    }
} 