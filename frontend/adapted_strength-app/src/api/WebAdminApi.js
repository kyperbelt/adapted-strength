import { ApiUtils, HttpStatus } from './ApiUtils';

export class WebAdminApi {
  
  // Original methods
  static getContentFull() {
    return ApiUtils.apiGet('webadmin/content').then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error getting content');
    });
  }

  static getContent({ resource }) {
    return ApiUtils.apiGet(`content/${resource}`).then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error getting content');
    });
  }

  static getTermsOfService(id) {
    return ApiUtils.apiGet(`webadmin/terms-of-service/${id}`).then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error getting terms of service');
    });
  }

  static createTermsOfService(termsOfService) {
    return ApiUtils.apiPost('webadmin/terms-of-service', termsOfService).then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error creating terms of service');
    });
  }

  // About Us Content
  static getAboutUsContent() {
    return ApiUtils.apiGet('webadmin/about-us').then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error getting About Us content');
    });
  }

  static updateAboutUsContent(data) {
    return ApiUtils.apiPost('webadmin/about-us', data).then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error updating About Us content');
    });
  }

  // Home Page Content
  static getHomePageContent() {
    return ApiUtils.apiGet('webadmin/home-page').then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error getting Home Page content');
    });
  }

  static updateHomePageContent(data) {
    return ApiUtils.apiPost('webadmin/home-page', data).then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error updating Home Page content');
    });
  }

  // Public endpoints
  static getPublicAboutUs() {
    return ApiUtils.apiGet('content/about-us').then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error getting About Us content');
    });
  }

  static getPublicHomePage() {
    return ApiUtils.apiGet('content/home-page').then((res) => {
      if (res.status === HttpStatus.OK) {
        return res.data;
      }
      throw new Error('Error getting Home Page content');
    });
  }
}
