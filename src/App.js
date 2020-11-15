import React, { Component } from 'react';
import Header from './Header/Header';
import Landing from './Intro/Landing';
import SignUp from './SignUp/SignUp';

export default class App extends Component {
  render() {
    return (
      <body>
        <Header/>
        <Landing/>
      </body>
    )
  }
}