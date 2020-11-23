import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Landing from './Landing/Landing';
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

export default class App extends Component {
  render() {
    return (
      <>
        
        <Route exact path='/register' component={SignUp}/>
        <Route exact path='/login' component={SignIn}/>
        <Route exact path='/' component={Landing}/>
        
        <Route exact path='/logdisplay' component={() => {
          return (
            <>
              
              
              <LogDisplay/>
            </>
          )
        }}/>
        <Route exact path='/logbook' component={() => {
          return (
            <>
              
              <LogBook/>
            </>
          )
        }}/>
        <Route exact path='/usermanual' component={() => {
          return (
            <>
              
              <UserManual/>
            </>
          )
        }}/>
        
        <Route exact path='/logbook/:log_metric' component={(props) => {
          console.log(props);
          let renderLogMetric;
          if (props.match.params.log_metric === 'blood_sugar') {
            renderLogMetric = ( 
              <>
              <Nav/>
              <SugarLog/>
              </>
            )
          } else if (props.match.params.log_metric === 'medications') {
            renderLogMetric = (
              <>
                <Nav/>
                <MedicationsLog/>
              </>
            )
          } else if (props.match.params.log_metric === 'meal_regimens') {
            renderLogMetric = (
              <>
                <Nav/>
                <MealsLog/>
              </>
            )
          }
          return (
            <>
            {renderLogMetric}
            </>
          )
        }}/>

      </>
    )
  }
}