import { ApiUtils, HttpStatus } from "./ApiUtils";

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
    const promise = ApiUtils.apiGet("user/profile");
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
  static updateProfileInformation({
    first_name,
    last_name,
    phone,
    address,
    city,
    state,
    zipcode,
    country,
  }) {
    const profile = {
      first_name,
      last_name,
      cell_phone: phone,
      address,
      city,
      state,
      zipcode,
      country,
    };
    console.log(JSON.stringify(profile));

    const promise = ApiUtils.apiPut("user/profile", profile);
    return promise;
  }

  static updateSubscription({ subscriptionTier }) {
    console.log("THIS IS THE API RECEIVED DATA: ", subscriptionTier);
    const data = {
      status: subscriptionTier,
    };

    console.log(JSON.stringify(data));

    const promise = ApiUtils.apiPost("user/subscribe", data);
    return promise;
  }

  /**
   * @param {Object} information
   * @returns {Promise<Response>} Promise<Response>
   * @memberof UserApi
   * @description This method will create a new user profile with the specified data
   * @example
   * UserApi.createProfileInformation({
   *                                   first_name: 'John',
   *                                    last_name: 'Doe',
   *                                    email: 'some@email.com',
   *                                    cell_phone: '1234567890',
   *                                    home_phone: '1234567890',
   *                                    address: {
   *                                      address: '1234 Example St',
   *                                      city: 'Example',
   *                                      state: 'EX',
   *                                      zipcode: '12345',
   *                                    },
   *                                    emergency_contact: {
   *                                      name: 'Jane',
   *                                      last_name: 'Doe',
   *                                      phone: '1234567890',
   *                                    },
   *                                    how_did_you_hear: 'Friend'
   *                                   });
   *
   */
  static createProfileInformation(information) {
    const promise = ApiUtils.apiPost("user/create", information);
    return promise;
  }

  /**
   * @param {Object} information
   * @returns {Promise<Response>} Promise<Response>
   * @memberof UserApi
   * @description This method will validate the user's profile information with the specified data before creating a new user and their profile. This is to prevent users fron creating a user profile and then not entering the required information.
   */
  static validateProfileInformation(information) {
    const promise = ApiUtils.apiPost("user/validate_user_data", information);
    return promise;
  }

  /**
   * @param {Object} information
   * @returns {Promise<Response>} Promise<Response>
   * @memberof UserApi
   * @description This method will create a new user profile with the specified data
   * @example
   * UserApi.createProfileInformation({
   *                                   first_name: 'John',
   *                                    last_name: 'Doe',
   *                                    email: 'some@email.com',
   *                                    cell_phone: '1234567890',
   *                                    home_phone: '1234567890',
   *                                    address: {
   *                                      address: '1234 Example St',
   *                                      city: 'Example',
   *                                      state: 'EX',
   *                                      zipcode: '12345',
   *                                    },
   *                                    emergency_contact: {
   *                                      name: 'Jane',
   *                                      last_name: 'Doe',
   *                                      phone: '1234567890',
   *                                    },
   *                                    how_did_you_hear: 'Friend'
   *                                   });
   *
   */
  static createProfileInformation(information) {
    const promise = ApiUtils.apiPost("user/create", information);
    return promise;
  }

  /**
   * @param {Object} information
   * @returns {Promise<Response>} Promise<Response>
   * @memberof UserApi
   * @description This method will validate the user's profile information with the specified data before creating a new user and their profile. This is to prevent users fron creating a user profile and then not entering the required information.
   */
  static validateProfileInformation(information) {
    const promise = ApiUtils.apiPost("user/validate_user_data", information);
    return promise;
  }

  static addOlympicEntry(olympic) {
    const promise = ApiUtils.apiPost("leaderboard/olympic", olympic);
    return promise;
  }

  static addPowerliftingEntry(powerlifting) {
    const promise = ApiUtils.apiPost("leaderboard/powerlifting", powerlifting);
    return promise;
  }

  static deleteOlympicEntry(id) {
    const promise = ApiUtils.apiDelete(`leaderboard/olympic/${id}`);
    return promise;
  }

  static deletePowerliftingEntry(id) {
    const promise = ApiUtils.apiDelete(`leaderboard/powerlifting/${id}`);
    return promise;
  }

  static getTop10OlympicMalesByWeightClass(weightClass) {
    const promise = ApiUtils.apiGet(
      `leaderboard/olympic/top10male?weightClass=${weightClass}`
    );
    return promise;
  }

  static getTop10OlympicFemalesByWeightClass(weightClass) {
    const promise = ApiUtils.apiGet(
      `leaderboard/olympic/top10female?weightClass=${weightClass}`
    );
    return promise;
  }

  static getTop10MalePowerliftersByWeightClass(weightClass) {
    const promise = ApiUtils.apiGet(
      `leaderboard/powerlifting/top10male?weightClass=${weightClass}`
    );
    return promise;
  }

  static getTop10FemalePowerliftersByWeightClass(weightClass) {
    const promise = ApiUtils.apiGet(
      `leaderboard/powerlifting/top10female?weightClass=${weightClass}`
    );
    return promise;
  }

  // USER PROGRAMMING  static

  // get user programming for self
  static getUserProgramming() {
    const promise = ApiUtils.apiGet("user/programming");
    return promise;
  }

  //ADMIN/COACH access
  // add programming to user
  static addProgramming(email, programId, startWeek, startDate) {
    const promise = ApiUtils.apiPost(
      `user/programming?email=${email}&programId=${programId}&startWeek=${startWeek}&startDate=${startDate.getTime()}`
    ).then((response) => {
      if (response.status === HttpStatus.OK) {
        return response.data;
      }
    });
    return promise;
  }

  // delete programming
  static deleteProgramming(upid) {
    const promise = ApiUtils.apiDelete(`user/programming/${upid}/remove`);
    return promise;
  }

  static getProgramming(email) {
    const promise = ApiUtils.apiGet(`user/programming/user/${email}`).then(
      (response) => {
        if (response.status === HttpStatus.OK) {
          return response.data;
        }
        throw new Error(`Failed to get programming: ${response.status}`);
      }
    );
    return promise;
  }

  // ADMIN/COACH User access

  static getAllUsers() {
    return ApiUtils.apiGet("user/get").then((response) => {
      if (response.status === HttpStatus.OK) {
        return response.data;
      }
      throw new Error(`Failed to get users: ${response.status}`);
    });
  }

  static getUser(email) {
    return ApiUtils.apiGet(`user/get/${email}`);
  }

  static deleteUser(email) {
    return ApiUtils.apiDelete(`user/delete/${email}`);
  }
}
