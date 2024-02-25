import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function ChatTest() {

    const onMessage = (payload) => {
        console.log('message recieved', payload);
    };

    const connect = (event) => {
        const nickname = "bob@gmail.com";
        const fullname = "Bob Doe";
        const usertype = "COACH"
        const nickname2 = "john@aol.com"
        const fullname2 = "John Bon"
        const usertype2 = "CLIENT"


        const socket = new SockJS('http://localhost:8080/v1/chat/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => { onConnected(stompClient, nickname, fullname, usertype, onMessage) }, () => { console.log('error!') });
        stompClient.connect({}, () => { onConnected(stompClient, nickname2, fullname2, usertype2,onMessage) }, () => { console.log('error!') });
        event.preventDefault();
    };

    const onConnected = (stompClient, nickname, fullname, usertype, onMessageReceived) => {
        stompClient.subscribe(`/user/${nickname}/queue/messages`, onMessageReceived);
        stompClient.subscribe(`/user/public`, onMessageReceived);
        console.log('connected');
        // register the connected user
        stompClient.send("/v1/chat/app/chatUser.addUser",
            {},
            JSON.stringify({ email: nickname, fullName: fullname, userType : usertype })
        );
    };

    return (
        <div className="flex flex-col items-center">
            <button type="button" className="bg-red-500 rounded-lg p-4 focus:bg-red-900 text-white hover:text-sky-50" onClick={connect} > PressMe Bro</button>
        </div>);
}
