/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import LoginPage from './login-page';
import CallbackPage from './callback-page.jsx';
import App from './App';
import './index.css';
import Oidc from 'oidc-client';

Oidc.Log.logger = console;

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/login" component={LoginPage} />
    <Route path="/callback" component={CallbackPage} />
  </Router>
), document.getElementById('root'));
