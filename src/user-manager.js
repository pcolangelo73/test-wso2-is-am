/**
 * TODO: Move the modified node module into src (untill we find out if wso2 IS supports jwks_uri)
 */

import { UserManager } from 'oidc-client/lib/oidc-client';
// import {UserManager} from './modified-libs/oidc-client-modified';

const BASE_URL = 'http://localhost:3001';

// user manager configuration object, see oidc-client-js documentation for details
const config = {
  client_id: 'yAKpff_1fDYFQGNzu0pBGaNgm_sa',
  redirect_uri: `${BASE_URL}/callback`,
  response_type: 'id_token token',
  scope: 'openid view_dcd view_cpp',
  authority: 'https://localhost:9443/oauth2/oidcdiscovery',
  post_logout_redirect_uri: `${BASE_URL}/login`,
  // automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: false,
  metadata: {
    authorization_endpoint: 'https://localhost:9443/oauth2/authorize',
    end_session_endpoint: 'https://localhost:9443/oidc/logout',
    userinfo_endpoint: 'https://localhost:9443/oauth2/userinfo?schema=openid',
    issuer: 'https://localhost:9443/oauth2/token'
    // jwks_uri: 'https://localhost:9443/oauth2/certificates' //just a guess, incorrect
  }
}

/*
 Other URLs
    revoke url (api manager) https://localhost:${https.nio.port}/revoke
*/

// create a user manager instance
const userManager = new UserManager(config);

export default userManager;
