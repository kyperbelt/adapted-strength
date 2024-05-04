import { ApiUtils, HttpStatus } from './ApiUtils';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class VideoApi {


  static getAllMovements() {
    const promise = ApiUtils.apiGet('movement/movements').then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error getting content');
    });
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
  static updateVideoInformation({ title, description, category, videoLink }) {
    const videoInfo = {
      title,
      description,
      category,
      link: videoLink
    };
    console.log(JSON.stringify(videoInfo));

    const promise = ApiUtils.apiPut('movement/update', videoInfo);
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
  static createVideoInformation({ title, description, categories, link }) {
    const videoInfo = {
      title,
      description,
      categories,
      link: link
    };
    console.log(JSON.stringify(videoInfo));

    const promise = ApiUtils.apiPost('movement/movements', videoInfo).then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error creating video');
    });
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
  static deleteMovement(movementId) {
    const promise = ApiUtils.apiDelete(`movement/movements/${movementId}`).then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error deleting movement');
    });
    return promise;
  }

  static getVideoId(url) {
    // check if the url is youtube.com/watch?v=videoId 
    // or youtu.be/videoId
    if (!url) {
      return null;
    }

    if (url.includes("youtube.com/watch?v=")) {
      try {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get("v");
        return videoId;
      } catch (e) { }
    } else if (url.includes("youtu.be/")) {
      try {
        const videoId = url.split("youtu.be/")[1];
        return videoId;
      } catch (e) { }
    }
    return null;
  };
}
