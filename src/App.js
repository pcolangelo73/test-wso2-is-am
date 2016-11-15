/* eslint-disable */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import userManager from './user-manager';
import { makeApiCall } from './api-util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    userManager.getUser()
      .then(user => {
        console.log('getUser(): ', user);
        if(user) {
          this.setState({
            user: user
          });
        } else {
          this.props.router.push('/login');
        }
      });
  }

  render() {
    const user = this.state.user;

    let content;
    if(user) {
      const list = Object.keys(user).map((okey, i) => (
        <li key={i}>{okey}: {user[okey]}</li>
      ));
      list.push(
        <li key={-1}>
          Expires At: {new Date(user.expires_at * 1000).toString()}
        </li>
      );
      content = (
        <div>
          <ul>
            {list}
          </ul>
        </div>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>WSO2 SSO Test</h2>
        </div>
        <div>
          <p>
            <strong>Session Info:</strong>
          </p>
          {content}
        </div>
        <div>
          <button onClick={onLogout}>Log out</button>
        </div>
        <div>
          <p>Test APIs:</p>
          <div>
            <button onClick={this.getDcdReports.bind(this)}>Test DCD List Reports</button>
            <button onClick={this.getCppReports.bind(this)}>Test CPP List Reports</button>
          </div>
          <div>
            <p>
              {this.state.output}
            </p>
          </div>
        </div>
      </div>
    );
  }

  getDcdReports() {
    this.callApi('https://localhost:8244/dcd/1.0.0/dcd-listing');
  }

  getCppReports() {
    this.callApi('https://localhost:8244/cpp/1.0.0/cpp-listing');
  }

  callApi(url) {
    makeApiCall(url)
      .then(json => {
        this.setState({
          output: JSON.stringify(json)
        })
      }).catch(err => {
        this.setState({
          output: err.toString()
        })
      });
  }

}

function onLogout(e) {
  e.preventDefault;

  //https://localhost:9443/commonauth?commonAuthLogout=true&type=oidc2&commonAuthCallerPath=http://localhost:3001&relyingParty=yAKpff_1fDYFQGNzu0pBGaNgm_sa
  //window.location.assign('https://localhost:9443/commonauth?commonAuthLogout=true&type=oidc&commonAuthCallerPath=http://localhost:3001/&relyingParty=WSO2.ORG_admin_test-app_PRODUCTION');
  //https://localhost:9443/commonauth?commonAuthLogout=true&type=oidc&commonAuthCallerPath=http://localhost:3001/&relyingParty=WSO2.ORG_admin_test-app_PRODUCTION
  userManager.signoutRedirect();
}

export default App;
