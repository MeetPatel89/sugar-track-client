import React, { Component } from 'react';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import './App.css';
import Footer from './Footer/Footer';
import UserManual from './UserManual/UserManual';
import Header from './Header/Header';
import config from './config';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInForm: true,
      Landing: true,
    };
  }

  handleClick = () => {
    // Reverse state's signInForm boolean on click
    this.setState((prevState) => ({
      signInForm: !prevState.signInForm,
    }));
  };

  handleStart = () => {
    this.setState({
      Landing: false,
    });
  };

  render() {
    console.log(config.API_BASE_URL)
    return (
      <>
        {this.state.Landing ? (
          <>
            <Header />

            <UserManual />
            <div className="dummy-account">
              <p>Use the following user credentials to explore the app:</p>
              <ul>
                <li>Username: fibonacci89</li>
                <li>Password: RandomFibonacci12#</li>
              </ul>
            </div>
            <button
              type="button"
              className="get-started"
              onClick={this.handleStart}
            >
              Get Started
            </button>
          </>
        ) : this.state.signInForm ? (
          <SignIn handleClick={this.handleClick} />
        ) : (
          <SignUp handleClick={this.handleClick} />
        )}
        <Footer />
      </>
    );
  }
}
