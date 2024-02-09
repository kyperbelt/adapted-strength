import { ApiUtils } from './ApiUtils';
// create an object of the AuthApi class
// it will make calls using fetch 

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthApi {

  static login(username, password) {
    const credentials = {
      username,
      password,
    };
    const promise = ApiUtils.apiPost('auth/login', credentials);
    return promise;
  }


  static logout() {
    const promise = ApiUtils.apiPost('auth/logout');
    return promise;
  }

  static signup(username, password) {
    const credentials = {
      username,
      password,
    };
    const promise = ApiUtils.apiPost('auth/signup', credentials);
    return promise;
  }

  static isLoggedIn() {
    // TODO: README:
    // We might want to do a more sophisticated check here, 
    // but for now we just check if the token cookie exists. 
    //
    // I think this might sort itself out if for example, someone tries to 
    // make a request to the server with an invalid token. Then the server 
    // will respond with an error, and the user will be logged out.
    const authTokenName = "adapted-strength_auth-token";
    const tokenExists = document.cookie.includes(authTokenName);

    console.log("Checking if user is logged in: ", tokenExists ? "Yes" : "No");
    return tokenExists;
  }
}
