import {HttpStatus, ApiUtils, AUTH_TOKEN_NAME} from './ApiUtils';


/**
 * Programming API.
 */
// biome-ignore lint/complexity/noStaticOnlyClass: This is only to call api calls, no need to create instance
export class ProgrammingApi {

  /**
   * Retrieves all programs.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  static getAllPrograms() {
    return ApiUtils.apiGet('programming/all_programs').then((r)=>{
      if (r.status === HttpStatus.OK) {
        return r.data;
      }
      throw new Error(`Error getting all programs: ${r.status}`);
    }).catch((error) => {
      console.error('Error getting all programs:', error);
      throw error;
    });
  }

  /**
   * Creates a new program.
   * @param {Object} programData - The data for the new program.
   * @param {string} programData.name - The name of the program.
   * @param {string} programData.description - The description of the program.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  static createProgram({name, description}){
    const program = {
      programName: name,
      description: description
    };

    return ApiUtils.apiPost('programming/program', program).then((r)=>{
      if (r.status === HttpStatus.OK) {
        return r;
      }
      throw new Error(`Error creating program: ${r.status}`);
    }).catch((error) => {
      console.error('Error creating program:', error);
      throw error;
    });
  }

  static editProgram({programId, name, description}){
    const program = {
      programId: programId,
      programName: name,
      description: description
    };

    return ApiUtils.apiPut('programming/program', program).then((r)=>{
      if (r.status === HttpStatus.OK) {
        return r;
      }
      throw new Error(`Error editing program: ${r.status}`);
    }).catch((error) => {
      console.error('Error editing program:', error);
      throw error;
    });
  }

  static deleteProgram(programId){
    return ApiUtils.apiDelete(`programming/program/${programId}`).then((r)=>{
      if (r.status === HttpStatus.OK) {
        return r;
      }
      throw new Error(`Error deleting program: ${r.status}`);
    }).catch((error) => {
      console.error('Error deleting program:', error);
      throw error;
    });
  }

  static getProgram(programId){
    return ApiUtils.apiGet(`programming/program/${programId}`).then((r)=>{
      if (r.status === HttpStatus.OK) {
        return r.data;
      }
      throw new Error(`Error getting program: ${r.status}`);
    }).catch((error) => {
      console.error('Error getting program:', error);
      throw error;
    });
  }


}
