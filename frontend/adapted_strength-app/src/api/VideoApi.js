import { ApiUtils } from './ApiUtils';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class VideoApi {

    /**
     * @returns {Promise} Promise<UserInformation>
     * @memberof UserApi
     * @description This method will return the vidoe information from the video library. For information on the structure of the reponse object, see the backend ##### model class located in the user/model package.
     * @example
     * UserApi.getProfileInformation()
     * .then(response => console.log(response));
     */
    static getProfileInformation() {
      const promise = ApiUtils.apiGet('v1/movement/get');
      return promise;
    }
  
    /**
    * @param {string} title
    * @param {string} description
    * @param {Category} category 
    * @param {string} link
    * @returns {Promise<Response>} Promise<Response>
    * @memberof UserApi
    * @description This method will update the video's information with the specified data
    * @example
    * UserApi.updateProfileInformation({ first_name: 'John', last_name: 'Doe', email: 'example@mail.com', phone: '1234567890', address: '1234 Example St', city: 'Example', state: 'EX', zip: '12345', country: 'USA' })
    * .then(response => console.log(response));
    */
    static updateVideoInformation({ title, description, category, link }) {
      const videoInfo = {
        title,
        description,
        category,
        link
      };
      console.log(JSON.stringify(videoInfo));
  
      const promise = ApiUtils.apiPut('v1/movement/update', videoInfo);
      return promise;
    }


    /**
    * @param {string} title
    * @param {string} description
    * @param {Enumerator} category 
    * @param {string} link
    * @returns {Promise<Response>} Promise<Response>
    * @memberof UserApi
    * @description This method will create a new video record with the specified data
    * @example
    * UserApi.updateProfileInformation({ first_name: 'John', last_name: 'Doe', email: 'example@mail.com', phone: '1234567890', address: '1234 Example St', city: 'Example', state: 'EX', zip: '12345', country: 'USA' })
    * .then(response => console.log(response));
    */
    static createVideoInformation({ title, description, category, link }) {
        const videoInfo = {
          title,
          description,
          category,
          link
        };
        console.log(JSON.stringify(videoInfo));
    
        const promise = ApiUtils.apiPost('v1/movement/create', videoInfo);
        return promise;
      }



    /**
     * @param {string} videoId
     * @returns {Promise<Response>} Promise<Response>
     * @memberof VideoApi
     * @description This method will delete the video with the specified ID
     * @example
     * VideoApi.deleteVideo('123456')
     * .then(response => console.log(response));
     */
    static deleteVideo(videoId) {
        const promise = ApiUtils.apiDelete(`v1/movement/delete/${videoId}`);
        return promise;
    }
}