import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import Header from '../Header/Header';
import './SignUp.css';

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

        /*
        const signIn =  (this.state.signIn) 
                        ? <button type="submit"><Link to='/login'>Sign Up</Link></button>
                        : <button type="submit">Sign Up</button>
        */
        return (
        
                <>
                    
                    {(!this.state.signIn)
                    ? 
                    <>
                    
                    
                    <div className={`sign-up-container form-container ${this.props.noDisplay ? `noDisplay` : ``}`}>
                    
                    
                    <form onSubmit={this.handleSubmit}>
                    <h2 className="form-title">CREATE ACCOUNT</h2>
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
                        
                        <button type="submit" className="form-button">Sign Up</button>
                        {this.state.error}
                    </form>
                    {/* <div className="sign-in-direct">
                        <p>Already have an account? <button type="button" className="form-button" onClick={this.handleClick}>Sign In</button></p>
                        
                    </div> */}
                    
                     
                </div> 
                 </>       
                
                : <SignIn/>}
                    
                </>
            
        );

    }
} 