import React, { Component } from 'react';

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
                            <label>
                                Username:
                                <input type="text" name="username"/>
                            </label>
                            <label>
                                Password:
                                <input type="password" name="password"/>
                            </label>
                            <label>
                                Confirm Password:
                                <input type="password" name="password"/>
                            </label>
                            <button type="submit">Sign Up</button>
                        </form>
                        <div>
                            <p>Already have an account? Sign In</p>
                        </div>
                         
                    </section> 
                </>
            
        );

    }
} 