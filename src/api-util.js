import userManager from './user-manager';

export function makeApiCall(url, method = 'GET') {

  return userManager.getUser()
    .then(user => {
      const accessToken = user.access_token;
      
      const headers = new Headers({
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken
      });

      const request = new Request(url, {
        credentials: 'same-origin',
        headers: headers,
        method: method
      });

      return fetch(request)
        .then(response => {
          if(response.ok) {
            return response.json();
          } else {
            console.error('API Call Error: ', response);
            return Promise.reject(response);
          }
        })
    });

}
