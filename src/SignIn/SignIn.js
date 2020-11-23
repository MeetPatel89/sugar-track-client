import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
       console.log('Handle submit works')
       
        
        
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
                            <input type="text" name="username" onChange={this.handleChange} required/>
                        </label>
                        <br/>
                        <label>
                            Password:
                            <input type="password" name="password" onChange={this.handleChange} required/>
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