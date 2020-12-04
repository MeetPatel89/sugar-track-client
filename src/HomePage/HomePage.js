import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LogDisplay from '../Logdisplay/Logdisplay';
import LogBook from '../LogBook/LogBook';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Introduction from '../Introduction/Introduction';
import UserManual from '../UserManual/UserManual';
import MealsLog from '../MealsLog/MealsLog';
import MedicationsLog from '../MedicationsLog/MedicationsLog';
import SugarLog from '../SugarLog/SugarLog';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

   

    render() {

        const toRender =  (<>
                                <Header user={this.props.user} handleLogOut={this.props.handleLogOut}/>
                                
                                    <Nav/>
                        <br/>
                        <br/>
                        
                          <Route exact path='/' component={Introduction}/>  
                          <Route path='/logbook' component={LogBook}/>
                          <Route path='/logdisplay' component={(props) => {
                              return <LogDisplay id={this.props.id}/>
                          }}/>
                          
                          <Route path='/usermanual' component={UserManual}/>
                          <Route path='/logbook/:log_metric' component={(props) => {
                              
                              const log_metric = props.match.params.log_metric;
                              if(log_metric === 'blood_sugar') {
                                  return <SugarLog id={this.props.id}/>
                              } else if (log_metric === 'meal_regimens') {
                                  return <MealsLog id={this.props.id}/>
                              }
                                return <MedicationsLog id={this.props.id}/>
                          }}/>
                            
                        
                                </>)
                            

        return (
            <>
                {toRender}
            </>
            
        )
    }
}