import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Landing from './Intro/Landing';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';

export default class App extends Component {
  render() {
    return (
      <body>
        <Header/>
        <Route exact path='/register' component={SignUp}/>
        <Route exact path='/login' component={SignIn}/>
        <Route exact path='/' component={Landing}/>
      </body>
    )
  }
}