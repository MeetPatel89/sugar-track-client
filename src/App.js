import React, { Component } from 'react';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import Overlay from './Overlay/Overlay';
import Header from './Header/Header';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightPanelActive: false,
      signInTransparent: false,
      noDisplay: false
    }
  }
  handleClickSignUpButton = () => this.setState({
    rightPanelActive: true,
    signInTransparent: true,
    
});

handleClickSignInButton = () => this.setState({
    rightPanelActive: false,
    signInTransparent: false
});

handleSetTransparent = () => this.setState({
  noDisplay: !this.state.noDisplay
})


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
                  
                    <SignUp noDisplay={this.state.noDisplay} />
                    <SignIn signInTransparent={this.state.signInTransparent} noDisplay={this.state.noDisplay} setTransparent={this.handleSetTransparent}/>
                    <Overlay
                        handleClickSignInButton={handleClickSignInButton}
                        handleClickSignUpButton={handleClickSignUpButton}
                        noDisplay={this.state.noDisplay}
                        setTransparent={this.handleSetTransparent}
                    />
                </div>
            </div>
    )
  }
}