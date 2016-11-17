/**
 * TODO: Move the modified node module into src (untill we find out if wso2 IS supports jwks_uri)
 */

// import { UserManager } from 'oidc-client/lib/oidc-client';
import {UserManager} from '../modified-libs/oidc-client/lib/oidc-client';

const BASE_URL = 'http://localhost:3001';

// user manager configuration object, see oidc-client-js documentation for details
const config = {
  authority: 'https://localhost:9443/oauth2/oidcdiscovery',
  client_id: 'yAKpff_1fDYFQGNzu0pBGaNgm_sa',
  redirect_uri: `${BASE_URL}/callback`,
  response_type: 'id_token token',
  scope: 'openid view_dcd view_cpp',
  metadata: {
    authorization_endpoint: 'https://localhost:9443/oauth2/authorize',
    end_session_endpoint: 'https://localhost:9443/oidc/logout',
    userinfo_endpoint: 'https://localhost:9443/oauth2/userinfo?schema=openid',
    issuer: 'https://localhost:9443/oauth2/token'
    // jwks_uri: 'https://localhost:9443/oauth2/certificates' //just a guess, incorrect
  },
  //signingKeys: '', //keys property of the jwks_uri endpoint
  loadUserInfo: false, //TODO
  filterProtocolClaims: true,
  post_logout_redirect_uri: `${BASE_URL}/login`,
  silent_redirect_uri: `${BASE_URL}/callbacksilent`,
  automaticSilentRenew: false,
  accessTokenExpiringNotificationTime: 60,
  checkSessionInterval: 2000
  //revokeAccessTokenOnSignout - TODO  
}

// create a user manager instance
const userManager = new UserManager(config);

userManager.events.addAccessTokenExpiring(() => {
  console.log('accessTokenExpiring fired!');
  console.log('calling signin silent');
  userManager.signinSilent();
});

/*
  Events:
    userLoaded: Raised when a user session has been established (or re-established).
    userUnloaded: Raised when a user session has been terminated.
    accessTokenExpiring: Raised prior to the access token expiring.
    accessTokenExpired: Raised after the access token has expired.
    silentRenewError: Raised when the automatic silent renew has failed.
    userSignedOut [1.1.0]: Raised when the user's signin status at the OP has changed.
*/

export default userManager;
