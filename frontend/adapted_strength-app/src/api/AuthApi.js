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
}
