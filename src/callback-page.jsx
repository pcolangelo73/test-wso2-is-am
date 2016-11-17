/* eslint-disable */

import React from 'react';
import userManger from './user-manager';

class CallbackPage extends React.Component {

  componentWillMount() {
    if(this.props.route.path === '/callbacksilent') {
      console.log('Calling signinSilentCallback()');
      userManger.signinSilentCallback();
    } else {
      // For some reason need to manually call the redirect callback. Didnt need to originally. Must have broke something???
      userManger.signinRedirectCallback(window.location.href)
        .then(() => {
          this.props.router.push('/');
        });
    }
  }

  render() {
    return <h2>Redirecting...</h2>;
  }
}

export default CallbackPage;
