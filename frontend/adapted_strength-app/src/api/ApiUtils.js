const BASE_API_URL = 'http://localhost:8080';
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ApiUtils {

  /**
  * @param {string} endpoint
  * @param {string} version
  * @returns {string}
  * @memberof ApiUtils
  * @description This method will return the full API URL for the specified endpoint and version
  */
  static getApiUrl(endpoint, version = 'v1') {
    return `${BASE_API_URL}/${version}/${endpoint}`;
  }

  static apiGet(endpoint, options = {}, version = 'v1') {
    return promiseWrapper(fetch(ApiUtils.getApiUrl(endpoint, version), {
      method: 'GET',
      credentials: 'include',
      ...options,
    }));
  }

  /**
   * @param {string} endpoint- the endpoint to request, include the resource path as well.
   * @param {object} body - the body of the request to be sent
   * @param {object} options - the options to be included in the request for options look at the {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options|fetch} documentation
   * @param {string} version - the version of the API to use (default is v1)
   * @returns {Promise}
   * @memberof ApiUtils
   * @description This method will make a POST request to the specified endpoint with the specified body and options
   * and return the response as a promise
   * @example
   * ApiUtils.apiPost('auth/login', { username: 'user', password: 'password' })
   *  .then(response => console.log(response));
   */
  static apiPost(endpoint, body, options = {}, version = 'v1') {
    return promiseWrapper(fetch(ApiUtils.getApiUrl(endpoint, version), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      ...options,
    }));
  }

  static apiPut(endpoint, body, options = {}, version = 'v1') {
    return promiseWrapper(fetch(ApiUtils.getApiUrl(endpoint, version), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      ...options,
    }));
  }

  static apiDelete(endpoint, options = {}, version = 'v1') {
    return promiseWrapper(fetch(ApiUtils.getApiUrl(endpoint, version), {
      method: 'DELETE',
      credentials: 'include',
      ...options,
    }));
  }


}


/**
 * @param {Promise} promise
 * @returns {Promise} Promise
 * @memberof ApiUtils
 * @description This method will return a promise that resolves into an object containing the status code and the data from the response
 * @example
 * promiseWrapper(fetch('http://example.com'))
 * .then(response => console.log(response.data));
 * // { status: 200, data: { ... } }
 */
function promiseWrapper(promise) {
  return promise.then(response => {
    return response.json().then(body => {
      return {
        status: response.status,
        data: body,
      }
    })
  })
}


/**
* @param {Promise} promise
  * @returns {httpCode, Promise}
  * @memberof ApiUtils
  * @description will throw a promise if it is pending which will be caught by the Suspense component and render the fallback
  */
export function suspensePromise(promise) {
  let status = 'pending';
  let response;
  // should return the error code too
  let httpCode = 200;

  const suspender = promise.then(
    res => {
      status = 'success';
      response = res;
      httpCode = res.status;
    },
    err => {
      status = 'error';
      response = err;
      httpCode = err.status;
    }
  );

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response;
      default:
        return response
    }
  }

  return { httpCode, read }
}




