import { ApiUtils } from './ApiUtils';

export class ChatApi {


    /**
   * @returns {Promise} Promise<UserInformation>
   * @memberof ChatApi
   * @description This method will return the list of chat users.
   * @example
   * UserApi.getChatUsers()
   * .then(response => console.log(response));
   */
    static getChatUsers() {
      const promise = ApiUtils.apiGet('/chatusers');
      return promise;
  }

    /**
   * @param {string} senderId
   * @param {string} receiverId
   * @returns {Promise} Promise<UserInformation>
   * @memberof ChatApi
   * @description This method will return the list of chat users.
   * @example
   * UserApi.getChatUsers()
   * .then(response => console.log(response));
   */
    static getChat({ senderId, receiverId }) {
      const endpoint = `/messages/${senderId}/${receiverId}`;
      const promise = ApiUtils.apiGet(endpoint);
      return promise;
    }

      /**
    * @param {string} senderId
    * @param {string} recipientId 
    * @param {boolean} hasNewMessage
    * @returns {Promise<Response>} Promise<Response>
    * @memberof ChatApi
    * @description This method will update has new message  flag in a chatroom for user with given id.
    * @example
    * ChatApi.markAsRead({
        "senderId": "bob@gmail.com",
        "recipientId": "alex@adaptedstrength.com",
        "hasNewMessage": false
    })
    * .then(response => console.log(response));
    */
        static markAsRead({ senderId, recipientId }) {
          const chatRoomId = senderId + "_" + recipientId;   
          const chatInfo = {
            chatRoomId,
            senderId,
            recipientId,
            hasNewMessage: false // hasNewMessage is set to false by default
          };
          console.log(JSON.stringify(chatInfo));
      
          const promise = ApiUtils.apiPut('/chatroom/setUnreadFalse', chatInfo);
          return promise;
        }



}