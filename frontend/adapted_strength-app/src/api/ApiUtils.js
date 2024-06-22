// When deploying use the following URL 
// const BASE_API_URL = 'https://q9jkbki2nc.execute-api.us-east-1.amazonaws.com';
// const BASE_API_URL = 'https://api.adaptedstrength.com';

// When developing use the following URL
const BASE_API_URL = 'http://localhost:8080';
// const BASE_API_URL = "http://10.0.0.63:8080"; // CASEY's host. 

export const AUTH_TOKEN_NAME = "adapted-strength_auth-token";

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

  static getBaseUrl() {
    return BASE_API_URL;
  }

  static apiGet(endpoint, options = {}, version = 'v1') {
    return promiseWrapper(fetch(ApiUtils.getApiUrl(endpoint, version), {
      method: 'GET',
      // credentials: 'include',
      headers: {
        'Authorization': `Bearer ${ApiUtils.getAuthToken()}`,
        ...options.headers,
      },
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
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ApiUtils.getAuthToken()}`,
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    }));
  }

  static apiPut(endpoint, body, options = {}, version = 'v1') {
    return promiseWrapper(fetch(ApiUtils.getApiUrl(endpoint, version), {
      method: 'PUT',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ApiUtils.getAuthToken()}`,
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    }));
  }

  static apiDelete(endpoint, options = {}, version = 'v1') {
    return promiseWrapper(fetch(ApiUtils.getApiUrl(endpoint, version), {
      method: 'DELETE',
      // credentials: 'include',
      headers: {
        'Authorization': `Bearer ${ApiUtils.getAuthToken()}`,
        ...options.headers,
      },
      ...options,
    }));
  }


  static setAuthToken(token) {
    localStorage.setItem(AUTH_TOKEN_NAME, token);
  }

  static getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_NAME);
  }

  static removeAuthToken() {
    localStorage.removeItem(AUTH_TOKEN_NAME);
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
      const status_code = response.status;
      if (status_code == HttpStatus.UNAUTHORIZED || status_code == HttpStatus.FORBIDDEN) {
        ApiUtils.removeAuthToken();
        // TODO: Redirect to login page
        window.location.replace("/");
      }

      return {
        status: status_code,
        data: body,
      }
    })
  }).catch(err => {
    if (err.message == 'Failed to fetch') {
      return {
        status: HttpStatus.SERVICE_UNAVAILABLE,
        data: { message: 'Service Unavailable' },
      }
    }
  });
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


/**
 *  Http status codes 
 */
export const HttpStatus = {
  /**
   * 100 - Continue
   */
  CONTINUE: 100,
  /**
    * 101 - Switching Protocols
    */
  SWITCHING_PROTOCOLS: 101,
  /**
   * 102 - Processing
   */
  PROCESSING: 102,
  /**
   * 103 - Early Hints
   */
  EARLY_HINTS: 103,
  /**
    * 200 - OK
    */
  OK: 200,
  /**
    * 201 - Created
    */
  CREATED: 201,
  /**
    * 202 - Accepted
    */
  ACCEPTED: 202,
  /**
    * 203 - Non Authoritative Information
    */
  NON_AUTHORITATIVE_INFORMATION: 203,
  /**
    * 204 - No Content
    */
  NO_CONTENT: 204,
  /**
    * 205 - Reset Content
    */
  RESET_CONTENT: 205,
  /**
    * 206 - Partial Content
    */
  PARTIAL_CONTENT: 206,
  /**
    * 207 - Multi-Status
    */
  MULTI_STATUS: 207,
  /**
    * 300 - Multiple Choices
    */
  MULTIPLE_CHOICES: 300,
  /**
    * 301 - Moved Permanently
    */
  MOVED_PERMANENTLY: 301,
  /**
    * 302 - Found (Previously "Moved temporarily")
    */
  FOUND: 302,
  /**
    * 303 - See Other
    */
  SEE_OTHER: 303,
  /**
    * 304 - Not Modified
    */
  NOT_MODIFIED: 304,
  /**
    * 305 - Use Proxy
    */
  USE_PROXY: 305,
  /**
    * 307 - Temporary Redirect
    */
  TEMPORARY_REDIRECT: 307,
  /**
    * 308 - Permanent Redirect
    */
  PERMANENT_REDIRECT: 308,
  /**
    * 400 - Bad Request
    */
  BAD_REQUEST: 400,
  /**
    * 401 - Unauthorized
    */
  UNAUTHORIZED: 401,
  /**
    * 402 - Payment Required
    */
  PAYMENT_REQUIRED: 402,
  /**
    * 403 - Forbidden
    */
  FORBIDDEN: 403,
  /**
    * 404 - Not Found
    */
  NOT_FOUND: 404,
  /**
    * 405 - Method Not Allowed
    */
  METHOD_NOT_ALLOWED: 405,
  /**
    * 406 - Not Acceptable
    */
  NOT_ACCEPTABLE: 406,
  /**
    * 407 - Proxy Authentication Required
    */
  PROXY_AUTHENTICATION_REQUIRED: 407,
  /**
    * 408 - Request Timeout
    */
  REQUEST_TIMEOUT: 408,
  /**
    * 409 - Conflict
    */
  CONFLICT: 409,
  /**
    * 410 - Gone
    */
  GONE: 410,
  /**
    * 411 - Length Required
    */
  LENGTH_REQUIRED: 411,
  /**
    * 412 - Precondition Failed
    */
  PRECONDITION_FAILED: 412,
  /**
    * 413 - Request Entity Too Large
    */
  REQUEST_TOO_LONG: 413,
  /**
    * 414 - Request-URI Too Long
    */
  REQUEST_URI_TOO_LONG: 414,
  /**
    * 415 - Unsupported Media Type
    */
  UNSUPPORTED_MEDIA_TYPE: 415,
  /**
    * 416 - Requested Range Not Satisfiable
    */
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  /**
    * 417 - Expectation Failed
    */
  EXPECTATION_FAILED: 417,
  /**
   * 418 - I'm a teapot
   */
  IM_A_TEAPOT: 418,
  /**
    * 419 - Insufficient Space on Resource
    */
  INSUFFICIENT_SPACE_ON_RESOURCE: 419,
  /**
    * 420 - Method Failure
    */
  METHOD_FAILURE: 420,
  /**
    * 421 - Misdirected Request
    */
  MISDIRECTED_REQUEST: 421,
  /**
    * 422 - Unprocessable Entity
    */
  UNPROCESSABLE_ENTITY: 422,
  /**
    * 423 - Locked
    */
  LOCKED: 423,
  /**
    * 424 - Failed Dependency
    */
  FAILED_DEPENDENCY: 424,
  /**
    * 426 - Upgrade Required
    */
  UPGRADE_REQUIRED: 426,
  /**
    * 428 - Precondition Required
    */
  PRECONDITION_REQUIRED: 428,
  /**
    * 429 - Too Many Requests
    */
  TOO_MANY_REQUESTS: 429,
  /**
    * 431 - Request Header Fields Too Large
    */
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  /**
    * 451 - Unavailable For Legal Reasons
    */
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  /**
    * 500 - Internal Server Error
    */
  INTERNAL_SERVER_ERROR: 500,
  /**
    * 501 - Not Implemented
    */
  NOT_IMPLEMENTED: 501,
  /**
    * 502 - Bad Gateway
    */
  BAD_GATEWAY: 502,
  /**
    * 503 - Service Unavailable
    */
  SERVICE_UNAVAILABLE: 503,
  /**
    * 504 - Gateway Timeout
    */
  GATEWAY_TIMEOUT: 504,
  /**
    * 505 - HTTP Version Not Supported
    */
  HTTP_VERSION_NOT_SUPPORTED: 505,
  /**
    * 507 - Insufficient Storage
    */
  INSUFFICIENT_STORAGE: 507,
  /**
    * 511 - Network Authentication Required
    */
  NETWORK_AUTHENTICATION_REQUIRED: 511,
}
