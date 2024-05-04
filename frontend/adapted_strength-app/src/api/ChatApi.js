import {ApiUtils} from './ApiUtils';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

export class ChatApi {


    /**
     * @param {JSON} coach
     * @returns {Promise} Promise<ChatUser>
     * @memberof ChatApi
     * @description This method will return the list of chat users that are "CLIENT".
     * @example
     * ChatApi.getChatUsers(coach)
     * .then(response => console.log(response));
     */

    static getClients(coach) {
        const promise = ApiUtils.apiPost('chat/clientChatUsers', coach);
        return promise;
    }


    /**
     * @param {JSON} client
     * @returns {Promise} Promise<ChatUser>
     * @memberof ChatApi
     * @description This method will return the list of chat users that are "COACH".
     * @example
     * ChatApi.getChatUsers(client)
     * .then(response => console.log(response));
     */
    static getCoaches(client) {
        const promise = ApiUtils.apiPost("chat/coachChatUsers", client);
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
    static getChat(senderId, receiverId) {
        const endpoint = `chat/messages/${senderId}/${receiverId}`;

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
    static markAsRead({senderId, recipientId}) {
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

    static getChatUsersStomp(coach) {
        return new Promise((resolve, reject) => {
            const socket = new SockJS(`http://localhost:8080/ws?jwtToken=${ApiUtils.getAuthToken()}`);
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                stompClient.subscribe('/chat/chatUsers', (response) => {
                    resolve(JSON.parse(response.body));
                    stompClient.disconnect();
                });

                stompClient.send('/chat/chatUsers', {}, JSON.stringify(coach));
            }, (error) => {
                reject(error);
            });
        });
    }

    static getChatSocket({senderId, receiverId}) {
        return new Promise((resolve, reject) => {
            const socket = new SockJS('http://localhost:8080/v1/chat/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                stompClient.subscribe(`/chat/messages/${senderId}/${receiverId}`, (response) => {
                    resolve(JSON.parse(response.body));
                    stompClient.disconnect();
                });
            }, (error) => {
                reject(error);
            });
        });
    }

    static getUnreadMessageForSender(receiverId) {
        const promise = ApiUtils.apiGet(`chat/message/getUnreadForSender/${receiverId}`);
        return promise;
    }

    static setMessagesToRead(receiverId) {
        const endpoint = `chat/message/markAsReadBySender/${receiverId}`;

        const promise = ApiUtils.apiPost(endpoint);
        return promise;
    }

}