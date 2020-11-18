import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
    render() {
        return (
        
                <>
                    <section className="sign-up">
                        <h2>CREATE ACCOUNT</h2>
                        <form>
                            <label>
                                Fullname:
                                <input type="text" name="name"/>
                            </label>
                            <br/>
                            <label>
                                Username:
                                <input type="text" name="username"/>
                            </label>
                            <br/>
                            <label>
                                Password:
                                <input type="password" name="password"/>
                            </label>
                            <br/>
                            <label>
                                Confirm Password:
                                <input type="password" name="password"/>
                            </label>
                            <br/>
                            <button type="submit">Sign Up</button>
                        </form>
                        <div>
                            <p>Already have an account? <Link to='/login'>Sign In</Link></p>
                        </div>
                         
                    </section> 
                </>
            
        );

    }
} 