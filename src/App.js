import React, { Component } from 'react';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import Overlay from './Overlay/Overlay';
import Header from './Header/Header';
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightPanelActive: false
    }
  }
  handleClickSignUpButton = () => this.setState({
    rightPanelActive: true,
});

handleClickSignInButton = () => this.setState({
    rightPanelActive: false,
});
  render() {
    const { handleClickSignUpButton, handleClickSignInButton } = this;
        const { rightPanelActive } = this.state;
    return (
      <div className="App">
        <Header/>
                <div
                    className={`container ${rightPanelActive ? `right-panel-active` : ``}`}
                    id="container"
                >
                  
                    <SignUp />
                    <SignIn />
                    <Overlay
                        handleClickSignInButton={handleClickSignInButton}
                        handleClickSignUpButton={handleClickSignUpButton}
                    />
                </div>
            </div>
    )
  }
}