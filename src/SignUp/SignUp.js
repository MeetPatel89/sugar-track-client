import React, { Component } from 'react';

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
        });
       
}

    handleClick = () => {
        this.setState({
            signIn: true
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // validation variable for password
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

      

        return (
        
               
                    <>
                    
                    
                    <div className="container">
                    <div className="form-container sign-up-container">
                    <h2>CREATE ACCOUNT</h2>
                    <form className="sign-up-form" onSubmit={this.handleSubmit}>
                        <div className="label-control">
                        <label htmlFor="fullname">Fullname:</label>
                            
                            <input type="text" name="fullname" id="fullname" onChange={this.handleChange} required/>
                            </div>
                        <div className="label-control">
                        <label htmlFor="username">Username:</label>
                            
                            <input type="text" name="username" id="username" onChange={this.handleChange} required/>
                            </div>
                      <div className="label-control">
                        <label htmlFor="password">Password:</label>
                            
                            <input type="password" name="password" id="password" onChange={this.handleChange} required/>
                            </div> 
                       <div className="label-control"> 
                        <label htmlFor="confirm-password">Confirm Password:</label>
                                   
                            <input type="password" name="confirm-password" id="confirm-password" onChange={this.handleChange} required/>
                            </div>
                        
                        
                        <button type="submit">Sign Up</button>
                        <p>Already have an account? <button type="submit" onClick={this.props.handleClick}>Sign In</button></p>
                        <p style={{color:"red"}}>{this.state.error}</p>
                    </form>
                    
                    </div>
                    
                     
                </div> 
                 </>       
                
                
                    
                
            
        );

    }
} 