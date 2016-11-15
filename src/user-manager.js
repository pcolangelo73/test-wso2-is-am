import { UserManager } from 'oidc-client';

const BASE_URL = 'http://localhost:3001';

// user manager configuration object, see oidc-client-js documentation for details
const config = {
  client_id: 'yAKpff_1fDYFQGNzu0pBGaNgm_sa',
  redirect_uri: `${BASE_URL}/callback`,
  response_type: 'token',
  scope: 'default',                               // TODO: Correct scope?
  //authority: 'https://localhost:9443/oauth2/authorize',
  authority: 'https://localhost:8244',
  post_logout_redirect_uri: `${BASE_URL}/login`,
  // automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: true,
  metadata: {
    // authorization_endpoint: 'https://localhost:9443/oauth2/authorize',
    authorization_endpoint: 'https://localhost:8244/authorize',
    // end_session_endpoint: 'https://localhost:8244/logout',
    // userinfo_endpoint: 'https://localhost:9443/oauth2/userinfo?schema=openid'
  }
}

// create a user manager instance
const userManager = new UserManager(config);

export default userManager;
