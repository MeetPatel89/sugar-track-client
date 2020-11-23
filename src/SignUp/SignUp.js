import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    handleChange = (e) => {
        console.log(e.target);
        console.log(e.target.value);
        console.log(e.target.name);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
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

        

        
    
        console.log(this.state);

    }

    render() {
        return (
        
                <>
                    <section className="sign-up">
                        <h2>CREATE ACCOUNT</h2>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Fullname:
                                <input type="text" name="name" onChange={this.handleChange} required/>
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
                        </form>
                        <div>
                            <p>Already have an account? <Link to='/login'>Sign In</Link></p>
                            {this.state.error}
                        </div>
                         
                    </section> 
                </>
            
        );

    }
} 