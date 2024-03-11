
import { ApiUtils } from './ApiUtils';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UserApi {

  /**
   * @returns {Promise} Promise<UserInformation>
   * @memberof UserApi
   * @description This method will return the user's profile information. For information on the structure of the reponse object, see the backend UserInformation model class located in the user/model package.
   * @example
   * UserApi.getProfileInformation()
   * .then(response => console.log(response));
   */
  static getProfileInformation() {
    const promise = ApiUtils.apiGet('user/profile');
    return promise;
  }

  /**
  * @param {string} first_name
  * @param {string} last_name
  * @param {string} email
  * @param {string} phone
  * @param {string} address
  * @param {string} city
  * @param {string} state
  * @param {string} zip
  * @param {string} country
  * @returns {Promise<Response>} Promise<Response>
  * @memberof UserApi
  * @description This method will update the user's profile information with the specified data
  * @example
  * UserApi.updateProfileInformation({ first_name: 'John', last_name: 'Doe', email: 'example@mail.com', phone: '1234567890', address: '1234 Example St', city: 'Example', state: 'EX', zip: '12345', country: 'USA' })
  * .then(response => console.log(response));
  */
  static updateProfileInformation({ first_name, last_name, phone, address, city, state, zipcode, country }) {
    const profile = {
      first_name,
      last_name,
      cell_phone: phone,
      address,
      city,
      state,
      zipcode,
      country
    };
    console.log(JSON.stringify(profile));

    const promise = ApiUtils.apiPut('user/profile', profile);
    return promise;
    
  }

static updateSubscription({ email, subscriptionTier }) {
    console.log("THIS IS THE API RECEIVED DATA: ", subscriptionTier);
    const data = {
      username: email,
      status: subscriptionTier
    };

    console.log(JSON.stringify(data));

    const promise = ApiUtils.apiPost('user/subscribe', data);
    return promise;
  }

}
