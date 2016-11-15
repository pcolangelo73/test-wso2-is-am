/* eslint-disable */

import React from 'react';
import userManger from './user-manager';

class CallbackPage extends React.Component {

  componentWillMount() {
    // For some reason need to manually call the redirect callback. Didnt need to originally. Must have broke something???
    userManger.signinRedirectCallback(window.location.href)
      .then(() => {
        this.props.router.push('/');
      });

    // userManger.getUser()
    //   .then(user => {
    //     console.log('userManager.getUser(): ', user);
    //     if(user) {
    //       console.log('Redirecting to logged in page');
    //       this.props.router.push('/');
    //     }
    //   })
    //   .catch(err => console.error(err));
  }

  render() {
    return <h2>Redirecting...</h2>;
  }
}

export default CallbackPage;
