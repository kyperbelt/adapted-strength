import { ApiUtils } from './ApiUtils';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class VideoApi {
  baseUrl = 'video/'

    static getVideo(name, user) {
      const url = this._videoUrlConstructor('download', user) + '?name=' + name; 
      const promise = ApiUtils.apiGet(url);
      return promise;
    }
  
    // static updateVideoInformation({ title, description, category, link }) {
    //   const videoInfo = {
    //     title,
    //     description,
    //     category,
    //     link
    //   };
    //   console.log(JSON.stringify(videoInfo));
  
    //   const promise = ApiUtils.apiPut('v1/movement/update', videoInfo);
    //   return promise;
    // }

    static createVideo(name, file, user) {
      const url = this._videoUrlConstructor('upload', coach)
    
      const body = new FormData();
      body.append("name", name)
      body.append("file", file)
      console.log("POSTing video" + name);
      
      const promise = ApiUtils.apiPostFormData(url, body);
      return promise;
    }

    static deleteVideo(name, user) {
        const promise = ApiUtils.apiDelete('delete', user);
        return promise;
    }

    static _videoUrlConstructor(type, user){
      return baseUrl + '/' + type + '/' + user; 
    }
}