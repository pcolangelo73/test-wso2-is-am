/**
 * The usermanager.js file contains all the config for OpenID Connect and exports an instance of Oidc.UserManager
 */

/**
 * TODO: Move the modified node module into src (untill we find out if wso2 IS supports jwks_uri. 
 * Update it doesnt so need to Create a pull request on the oidc-client library and add a configuration option to skip jwks validation.)
 * https://github.com/IdentityModel/oidc-client-js
 */
import {UserManager} from '../modified-libs/oidc-client/lib/oidc-client'; // import { UserManager } from 'oidc-client/lib/oidc-client';

const BASE_URL = 'http://localhost:3001'; //The root url of my SPA

const config = {
  client_id: 'yAKpff_1fDYFQGNzu0pBGaNgm_sa', // Identity provider client id
  authority: 'https://localhost:9443/oauth2', //WSO2 IS does not support discovery so the metadata property is used to supply the endpoints instead
  metadata: {
    authorization_endpoint: 'https://localhost:9443/oauth2/authorize',
    end_session_endpoint: 'https://localhost:9443/oidc/logout',
    userinfo_endpoint: 'https://localhost:9443/oauth2/userinfo?schema=openid', //'https://localhost:8244/userinfo'
    issuer: 'https://localhost:9443/oauth2/token'
  },
  response_type: 'id_token token',
  scope: 'openid view_dcd view_cpp',
  loadUserInfo: false, // CORS needs to be enabled for OPTIONS request on userinfo_endpoint in WSO2 for this to work. Have so far only figured out how to enable CORS for GETs so can call manually if needed on UI
  redirect_uri: `${BASE_URL}/callback`,
  silent_redirect_uri: `${BASE_URL}/callbacksilent`,
  post_logout_redirect_uri: `${BASE_URL}/login`, //Unfortunately IS does not support this param as of version 5.2.0
  filterProtocolClaims: true,
  automaticSilentRenew: false, //Doing it manually in "addAccessTokenExpiring" event handler below
  accessTokenExpiringNotificationTime: 60,
  checkSessionInterval: 2000
}

// create a user manager instance
const userManager = new UserManager(config);

// Attach to the access token expiring event and manually call the signInSilent()
userManager.events.addAccessTokenExpiring(() => {
  console.log('accessTokenExpiring fired!');
  console.log('calling signinSilent()');

  //Signin silent will be invisible to the user as it makes a request in the background to get a new token
  userManager.signinSilent();
});

// Export the usermanager instance so we can use it elsewhere
export default userManager;
