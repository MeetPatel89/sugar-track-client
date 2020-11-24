import React, { Component } from 'react';
import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header';
import SignUp from '../SignUp/SignUp';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            signUp: false
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

            (!this.state.signUp) ?
            (
                (!this.state.isLogged)
            ?
            (<>
                <Header/>
                <section className="log-in">
                    <h2>PLEASE SIGN IN</h2>
                    <form onSubmit={this.handleSubmit}>
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
                        <button type="submit">LogIn</button>
                        <p>Don't have an account <button type="submit" onClick={this.handleClick}>Sign up</button></p>
                    </form>
                    {this.state.error}
                </section>
             </>)
             :
            <HomePage user={this.state.username} isLogged={this.state.isLogged} id={this.state.id} />

        )
            
            : <SignUp/>
        )
            
    
}}