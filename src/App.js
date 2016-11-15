/* eslint-disable */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import userManager from './user-manager';

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
          {content}
        </div>
        <div>
          <button onClick={onLogout}>Log out</button>
        </div>
      </div>
    );
  }
}

function onLogout(e) {
  e.preventDefault;
  userManager.signoutRedirect();
}

export default App;
