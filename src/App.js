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
    // Quick and Dirty way to show the current token info and poll for update every 2000ms to show the new token info after silent refresh. 
    // Not bothering keeping it DRY
    userManager.getUser()
      .then(user => {
        if(user) {
          this.setState({
            user: user
          });
        } else {
          this.props.router.push('/login');
        }
      });
    setInterval(() => {
      userManager.getUser()
        .then(user => {
          if(user) {
            this.setState({
              user: user
            });
          } else {
            this.props.router.push('/login');
          }
        });
    }, 2000);
  }

  render() {
    const user = this.state.user;

    // Iterate through the keys in the user object and display them on the screen in a list
    let content;
    if(user) {
      const list = Object.keys(user).map((okey, i) => {
        if(typeof user[okey] === 'object') {
          const subList = Object.keys(user[okey]).map((innerKey, j) => (
            <li key={-j}> {innerKey}: {user[okey][innerKey]} </li>
          ));
          return( 
            <li key={Math.random() * 1000}>
              {okey}: 
              <ul key={Math.random() * 1000}>{subList}</ul> 
            </li>
          );
        }
        return <li key={i}>{okey}: {user[okey]}</li>;
      });
      list.push(
        <li key={-9999999}>
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
          <p>
            Time: {new Date().toString()}
          </p>
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

// Single Sign out
function onLogout(e) {
  e.preventDefault;
  userManager.signoutRedirect();
}

export default App;
