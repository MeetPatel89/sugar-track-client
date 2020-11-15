import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Landing from './Intro/Landing';
import SignUp from './SignUp/SignUp';

export default class App extends Component {
  render() {
    return (
      <body>
        <Header/>
        <Route exact path='/register' component={SignUp}/>
        <Route exact path='/' component={Landing}/>
      </body>
    )
  }
}