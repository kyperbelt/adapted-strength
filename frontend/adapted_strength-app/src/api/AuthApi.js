import { HttpStatus, ApiUtils, AUTH_TOKEN_NAME } from "./ApiUtils";

// create an object of the AuthApi class
// it will make calls using fetch

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthApi {
  static login(username, password) {
    const credentials = {
      username,
      password,
    };
    const promise = ApiUtils.apiPost("auth/login", credentials);
    return promise;
  }

  static logout() {
    const promise = ApiUtils.apiPost("auth/logout");
    ApiUtils.removeAuthToken();
    return promise;
  }

  static signup(username, password) {
    const credentials = {
      username,
      password,
    };
    const promise = ApiUtils.apiPost("auth/signup", credentials);
    return promise;
  }

  static forgotPassword(email) {
    const promise = ApiUtils.apiPost("auth/forgot_password", { email });
    return promise;
  }

  // open
  static resetPassword(password, token) {
    const request = {
      newPassword: password,
      resetToken: token,
    };
    const promise = ApiUtils.apiPut("auth/reset_password", request);
    return promise;
  }

  /**
   *
   * @param {string} email
   * @returns {Promise} promise
   * @description This function is used to validate if the email is already in use or does not meet the required criteria. It does not create a user.
   */
  static validateCredentials(email, password) {
    const credentials = {
      username: email,
      password,
    };
    const promise = ApiUtils.apiPost(`auth/validate_credentials`, credentials);
    return promise;
  }

  static isLoggedIn() {
    // TODO: README:
    // We might want to do a more sophisticated check here,
    // but for now we just check if the token exists.
    //
    // I think this might sort itself out if for example, someone tries to
    // make a request to the server with an invalid token. Then the server
    // will respond with an error, and the user will be logged out.
    const tokenExists = localStorage.getItem(AUTH_TOKEN_NAME) !== null;

    console.log("Checking if user is logged in: ", tokenExists ? "Yes" : "No");
    return tokenExists;
  }

  /**
   * @description This function is used to check if the user has a specific role.
   * @param {string} role
   * @returns {Boolean} true if the user has the role, false otherwise.
   *
   * @example
   * AuthApi.hasRole('ROLE_ADMIN');
   *
   * @example
   * AuthApi.hasRole('ROLE_USER');
   *
   */
  static hasRole(role) {
    const loggedIn = AuthApi.isLoggedIn();
    if (!loggedIn) {
      return new Promise((resolve, reject) => {
        resolve(false);
      });
    }

    const promise = ApiUtils.apiGet(`auth/has_role/${role}`);

    return promise
      .then((response) => {
        if (response.status === HttpStatus.OK) {
          console.log("User has role: ", role);
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.log(
          `Error checking if user has role: ${JSON.stringify(error)}`
        );
        return false;
      });
  }
}
