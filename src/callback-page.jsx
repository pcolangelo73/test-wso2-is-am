/**
 * This is the callback route/page that identity server will redirect to 
 * after a successful login or silent refresh. (routes: `/callback` & `/callbacksilent`)
 */
/* eslint-disable */
import React from 'react';
import userManger from './user-manager';

class CallbackPage extends React.Component {

  componentWillMount() {
    if(this.props.route.path === '/callbacksilent') {
      console.log('Calling signinSilentCallback()');
      // Just call the silent callback here to update the userManager's access token info. 
      // No need to redirect as this is being done in the background so the user will not see this page
      userManger.signinSilentCallback();
    } else {
      // This will update the userManager's access token info
      userManger.signinRedirectCallback(window.location.href)
        .then(() => {
          //and then redirect to the home page ('/')
          this.props.router.push('/');
        });
    }
  }

  render() {
    return <h2>Redirecting...</h2>;
  }
}

export default CallbackPage;
