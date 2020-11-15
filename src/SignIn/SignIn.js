import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SignIn extends Component {
    render() {
        return (
            <>
                <section className="log-in">
                    <h2>PLEASE SIGN IN</h2>
                    <form>
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
                        <button type="submit">LogIn</button>
                    </form>
                </section>
            </>
        )
    }
}