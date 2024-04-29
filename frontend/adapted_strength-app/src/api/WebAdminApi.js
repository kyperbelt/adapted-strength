import { ApiUtils, HttpStatus } from "./ApiUtils";

export class WebAdminApi{

  static getContentFull() {
    const promise = ApiUtils.apiGet('webadmin/content').then((res) =>{
      if (res.status === HttpStatus.OK){
        return res.data;
      }
      throw new Error('Error getting content');
    });
    return promise;
  }

  static getContent({resource}){
    const promise = ApiUtils.apiGet(`content/${resource}`).then((res) =>{
      if (res.status === HttpStatus.OK){
        return res.data;
      }
      throw new Error('Error getting content');
    });
    return promise; 
  }

  static getTermsOfService(id) {
    const promise = ApiUtils.apiGet(`webadmin/terms-of-service/${id}`).then((res) =>{
      if (res.status === HttpStatus.OK){
        return res.data;
      }
      throw new Error('Error getting terms of service');
    });
    return promise;
  }

  static createTermsOfService(termsOfService) {
    const promise = ApiUtils.apiPost('webadmin/terms-of-service', termsOfService).then((res) =>{
      if (res.status === HttpStatus.OK){
        return res.data;
      }
      throw new Error('Error creating terms of service');
    });
    return promise;
  }

}
