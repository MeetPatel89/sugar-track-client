import React, { Component } from 'react';
import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header';
import SignUp from '../SignUp/SignUp';
import './SignIn.css';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            signUp: false,
            signInTransparent: true
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
            signUp: true
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
       
       const username = this.state.username;
       const password = this.state.password;
       console.log(username);
       console.log(password);
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
                        this.props.setTransparent();
                        this.setState({
                            isLogged: true,
                            signInTransparent: false,
                            ...user[0]
                        })
                    }
                
            }
        })
        
        
    }

    render() {
        let opacity;
        if (!this.state.signInTransparent) {
            opacity = ''
        } else if (this.props.signInTransparent) {
            opacity = 'transparent'
        }
        return (

            (!this.state.signUp) ?
            (
                (!this.state.isLogged)
            ?
            (<>
                
                
                <div  className={`sign-in-container form-container ${opacity} ${this.props.noDisplay ? `noDisplay` : ``}`}>
                    
                    <form onSubmit={this.handleSubmit}>
                        <h2 className="form-title">PLEASE SIGN IN</h2>
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
                        <button type="submit" className="form-button">LogIn</button>
                        {this.state.error}
                        
                    </form>
                    {/* <div className="sign-up-direct">
                        <p>Don't have an account <button type="button" className="form-button" onClick={this.handleClick}>Sign up</button></p>
                    </div> */}
                    
                    
                </div>
             </>)
             :
            <HomePage user={this.state.username} isLogged={this.state.isLogged} id={this.state.id} setTransparent={this.props.setTransparent}/>

        )
            
            : <SignUp/>
        )
            
    
}}