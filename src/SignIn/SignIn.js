import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Event works!');
        const username = e.target.username.value;
        const password = e.target.password.value;
        ((username === 'nautilus' && password === 'shell') ||
        (username === 'logarithm' && password === 'spiral') ||
        (username === 'fibonacci' && password === 'sequence')) 
        &&
        (this.setState({
                isLogged: true
        }))
        
        
    }

    render() {
        return (
            (!this.state.isLogged)
            ?
            (<>
                <section className="log-in">
                    <h2>PLEASE SIGN IN</h2>
                    <form onSubmit={this.handleSubmit}>
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
             </>)
             :
             <div><button><Link to='/homepage'>Get Started</Link></button></div>

        )
    }
}