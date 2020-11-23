import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import LogDisplay from '../Logdisplay/Logdisplay';
import LogBook from '../LogBook/LogBook';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Introduction from '../Introduction/Introduction';
import UserManual from '../UserManual/UserManual';
import SignIn from '../SignIn/SignIn';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedOut: false
        }
    }

    handleClick = () => {
        this.setState({
            isLoggedOut: true
        })
    }

    render() {

        const toRender = (!this.state.isLoggedOut)
                            ? (<>
                                <Header user={this.props.user} isLogged={this.props.isLogged}/>
                                <button type="submit" onClick={this.handleClick}>Log out</button>
                                    <Nav/>
                        <br/>
                        <br/>
                        
                          <Route exact path='/' component={Introduction}/>  
                          <Route path='/logdisplay' component={LogDisplay}/>
                          <Route path='/logbook' component={LogBook}/>
                          <Route path='/usermanual' component={UserManual}/>
                        <footer role="content-info">&#169;Meet 2020</footer>
                                </>)
                            : <SignIn/>

        return (
            <>
                {toRender}
            </>
            
        )
    }
}