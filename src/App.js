import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import HomePage from './HomePage/HomePage';
import LogDisplay from './Logdisplay/Logdisplay';
import LogBook from './LogBook/LogBook';
import UserManual from './UserManual/UserManual';
import SugarLog from './SugarLog/SugarLog';
import MedicationsLog from './MedicationsLog/MedicationsLog';
import MealsLog from './MealsLog/MealsLog';
import Nav from './Nav/Nav';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <>
        <SignUp/>
        

      </>
    )
  }
}