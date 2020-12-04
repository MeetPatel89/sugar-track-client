import React, { Component } from 'react';
import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            username: '',
            password: ''
        }
    }

    handleLogOut = () => {
        let user = {
            id: '',
            fullname: '',
            password: '',
            username: ''
        }
        this.setState({
            ...user,
            isLogged: false
        })
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
            .then(response => response.json())
            .then(user => {
         
            if (!user.length) {
                this.setState({
                    error: 'Please enter the correct username'
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
                    ? <HomePage user={this.state.username} handleLogOut={this.handleLogOut} id={this.state.id} />
                    :  
                    <>
                    <Header/>
                    <div className="container">
                        <div className="form-container sign-in-container">
                        <h2>PLEASE SIGN IN</h2>
                        <form className="sign-in-form" onSubmit={this.handleSubmit}>
                            <div className="label-control">
                            <label htmlFor="username">Username:</label>
                                <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} required/>
                                </div>
                            
                            <div className="label-control">
                            <label htmlFor="password"> Password:</label>
                               
                                <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} required/>
                                </div>
                            
                            <button type="submit">LogIn</button>
                            <p>Don't have an account <button type="submit" onClick={this.props.handleClick}>Sign up</button></p>
                            <p style={{color: "red"}}>{this.state.error}</p>
                        </form>
                        
                    </div>
                    </div>
                    </>}
                

               
             </>)
             
            

        
            
           
        
            
    
}}