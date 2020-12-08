import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      username: '',
      password: '',
      'confirm-password': '',
      usernameError: '',
      fullnameError: '',
      passwordError: '',
      confirmPasswordError: '',
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // validation variable for password
    const passwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (this.state.fullname.length > 36) {
      this.setState({
        fullnameError: 'Full name should be less than 36 characters',
        signUp: '',
        usernameError: '',
        passwordError: '',
        confirmPasswordError: '',
      });
    } else if (this.state.username.length > 36) {
      this.setState({
        usernameError: 'Username should be less than 36 characters',
        signUp: '',
        fullnameError: '',
        passwordError: '',
        confirmPasswordError: '',
      });
    } else if (!this.state.password.match(passwd)) {
      this.setState({
        passwordError:
          'Password should contain at least one uppercase letter, one lowercase letter and one numeric digit',
        signUp: '',
        confirmPasswordError: '',
        fullnameError: '',
        usernameError: '',
      });
    } else if (this.state.password !== this.state['confirm-password']) {
      this.setState({
        confirmPasswordError:
          '"Password" and "Confirm Password" fields should match each other',
        signUp: '',
        fullnameError: '',
        usernameError: '',
        passwordError: '',
      });
    } else {
      const { fullname, username, password } = this.state;
      const newUser = {
        fullname,
        username,
        password,
      };

      fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((user) => user.json())
        .then(() => {
          this.setState({
            signUp: 'You can now log in using newly created user credentials',
            fullnameError: '',
            usernameError: '',
            passwordError: '',
            confirmPasswordError: '',
            fullname: '',
            username: '',
            password: '',
            'confirm-password': '',
          });
        })
        .catch((error) => {
          this.setState({
            error: error.message,
          });
        });
    }
  };

  render() {
    return (
      <>
        <Header />
        <main className="container">
          <section className="form-container sign-up-container">
            <h2>CREATE ACCOUNT</h2>
            <form className="sign-up-form" onSubmit={this.handleSubmit}>
              <div className="label-control">
                <label htmlFor="fullname">Fullname</label>
                <span className="requiredField">(required)</span>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  aria-label="fullname"
                  aria-required="true"
                  aria-describedby="fullnameError"
                  aria-invalid="true"
                  value={this.state.fullname}
                  onChange={this.handleChange}
                  required
                />
                <div className="errorMessage" id="fullnameError">
                  {this.state.fullnameError}
                </div>
              </div>
              <div className="label-control">
                <label htmlFor="username">Username</label>
                <span className="requiredField">(required)</span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  aria-label="username"
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
                <label htmlFor="password">Password</label>
                <span className="requiredField">(required)</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  aria-label="password"
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
              <div className="label-control">
                <label htmlFor="confirm-password">Confirm Password</label>
                <span className="requiredField">(required)</span>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  aria-label="confirm-password"
                  aria-required="true"
                  aria-describedby="confirmPasswordError"
                  aria-invalid="true"
                  value={this.state['confirm-password']}
                  onChange={this.handleChange}
                  required
                />
                <div className="errorMessage" id="confirmPasswordError">
                  {this.state.confirmPasswordError}
                </div>
              </div>

              <button type="submit">Sign Up</button>
              <p>Already have an account?</p>
              <button type="submit" onClick={this.props.handleClick}>
                Sign In
              </button>
              <div className="fetchErrorMessage">{this.state.error}</div>
              <div className="sign-up">{this.state.signUp}</div>
            </form>
          </section>
        </main>
      </>
    );
  }
}

SignUp.defaultProps = {
  handleClick() {
    return 'handleClick function';
  },
};

SignUp.propTypes = {
  handleClick: PropTypes.func,
};
