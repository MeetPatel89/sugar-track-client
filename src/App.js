import React, { Component } from 'react';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import './App.css';
import Footer from './Footer/Footer';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInForm: true
    };
  }

  handleClick = () => {

    // Reverse state's signInForm boolean on click
    this.setState(prevState => {
      return {
        signInForm: !prevState.signInForm
      }
    })
  }

  render() {
    return (
      <>
        
        {(this.state.signInForm)
          ? <SignIn handleClick={this.handleClick}/>
          : <SignUp handleClick={this.handleClick}/>}
        <Footer/>
      </>
    )
  }
}