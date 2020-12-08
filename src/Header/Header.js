/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

export default function Header(props) {
  let welcomeMsg;
  if (props.user) {
    welcomeMsg = (
      <div className="header-container">
        <span className="welcome-msg">Welcome {props.user}!</span>
        <button type="button" className="log-out" onClick={props.handleLogOut}>
          Log out
        </button>
      </div>
    );
  } else {
    welcomeMsg = (
      <>
        <p>Keeping it (not) sweet and simple</p>
        <p>
          SugarTrack helps you maintain a logbook of blood sugar levels, meals
          and medications to better monitor your glycemic health!
        </p>
      </>
    );
  }

  return (
    <>
      <header className="logo">
        <h1 className="main-heading">
          <Link to="/" id="header">
            SugarTrack
          </Link>
        </h1>
        {welcomeMsg}

        <hr />
      </header>
    </>
  );
}

Header.defaultProps = {
  user: 'randomUser',
  handleLogOut() {
    return 'Default handleLogOut function';
  },
};

Header.propTypes = {
  user: PropTypes.string,
  handleLogOut: PropTypes.func,
};
