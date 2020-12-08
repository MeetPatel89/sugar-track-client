import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      username: '',
      password: '',
    };
  }

  handleLogOut = () => {
    const user = {
      id: '',
      fullname: '',
      password: '',
      username: '',
    };
    this.setState({
      ...user,
      isLogged: false,
      usernameError: '',
      passwordError: '',
    });
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    fetch(`http://localhost:8000/users/${username}`)
      .then((response) => response.json())
      .then((user) => {
        if (!user.length) {
          this.setState({
            usernameError: 'Please enter the correct username',
            passwordError: '',
          });
        } else if (user[0].password !== password) {
          this.setState({
            passwordError: 'Please enter the correct password',
            usernameError: '',
          });
        } else {
          this.setState({
            isLogged: true,
            ...user[0],
          });
        }
      });
  };

  render() {
    return (
      <>
        {this.state.isLogged ? (
          <HomePage
            user={this.state.username}
            handleLogOut={this.handleLogOut}
            id={this.state.id}
          />
        ) : (
          <>
            <Header />
            <main className="container">
              <section className="form-container sign-in-container">
                <h2>PLEASE SIGN IN</h2>
                <form className="sign-in-form" onSubmit={this.handleSubmit}>
                  <div className="label-control">
                    <label htmlFor="username">Username</label>
                    <span className="requiredField">(required)</span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      aria-label="Username for the account"
                      aria-required="true"
                      aria-describedby="usernameError"
                      aria-invalid="true"
                      value={this.state.username}
                      onChange={this.handleChange}
                      required
                    />
                    <div className="errorMessage" id="usernameError">
                      {this.state.usernameError}
                    </div>
                  </div>

                  <div className="label-control">
                    <label htmlFor="password"> Password</label>
                    <span className="requiredField">(required)</span>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      aria-label="Password for the account"
                      aria-required="true"
                      aria-describedby="passwordError"
                      aria-invalid="true"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                    <div className="errorMessage" id="passwordError">
                      {this.state.passwordError}
                    </div>
                  </div>

                  <button type="submit" className="log-in-button">
                    LogIn
                  </button>
                  <p>Don't have an account</p>
                  <button
                    type="submit"
                    className="sign-up-button"
                    onClick={this.props.handleClick}
                  >
                    Sign up
                  </button>
                </form>
              </section>
            </main>
          </>
        )}
      </>
    );
  }
}

SignIn.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
