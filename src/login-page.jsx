/* eslint-disable */

import React from 'react';
import userManager from './user-manager';
import logo from './logo.svg';

const LoginPage = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>WSO2 SSO Test</h2>
    </div>
    <p className="App-intro">
      <button onClick={onLogin}>Sign In with WSO2</button>
    </p>
  </div>
);

function onLogin(e) {
  e.preventDefault();
  userManager.signinRedirect();
}

export default LoginPage;
