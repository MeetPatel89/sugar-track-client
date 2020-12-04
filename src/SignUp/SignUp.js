import React, { Component } from 'react';

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: '',
            username: '',
            password: '',
            'confirm-password': ''
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
       
}


    handleSubmit = (e) => {
        e.preventDefault();

        // validation variable for password
        const passwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (this.state.fullname.length > 36) {
            this.setState({
                error: 'Full name should be less than 36 characters',
                signUp: ''
            })
        } else if (this.state.username.length > 36) {
            this.setState({
                error: 'Username should be less than 36 characters',
                signUp: ''
            })
        }
        else if (!this.state.password.match(passwd)) {
            this.setState({
                error: 'Password should contain at least one uppercase letter, one lowercase letter and one numeric digit',
                signUp: ''
            })
        } 
           else if (this.state.password !== this.state['confirm-password']) {
                this.setState({
                    error: '"Password" and "Confirm Password" fields should match each other',
                    signUp: ''
                })
            } else  {
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
       .then(() => {
           this.setState({
               signUp: 'You can now log in using newly created user credentials',
               error: '',
               fullname: '',
               username: '',
               password: '',
               'confirm-password': ''
           })
       })
       .catch(error => ({'error': error})) 
            }
        

        


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
                            
                            <input type="text" name="fullname" id="fullname" value={this.state.fullname} onChange={this.handleChange} required/>
                            </div>
                        <div className="label-control">
                        <label htmlFor="username">Username:</label>
                            
                            <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} required/>
                            </div>
                      <div className="label-control">
                        <label htmlFor="password">Password:</label>
                            
                            <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} required/>
                            </div> 
                       <div className="label-control"> 
                        <label htmlFor="confirm-password">Confirm Password:</label>
                                   
                            <input type="password" name="confirm-password" id="confirm-password" value={this.state['confirm-password']} onChange={this.handleChange} required/>
                            </div>
                        
                        
                        <button type="submit">Sign Up</button>
                        <p>Already have an account? <button type="submit" onClick={this.props.handleClick}>Sign In</button></p>
                        <p style={{color:"red"}}>{this.state.error}</p>
                        <p style={{color: "#2f004f"}}>{this.state.signUp}</p>
                    </form>
                    
                    </div>
                    
                     
                </div> 
                 </>       
                
                
                    
                
            
        );

    }
} 