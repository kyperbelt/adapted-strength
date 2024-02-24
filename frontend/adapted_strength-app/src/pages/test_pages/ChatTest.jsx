import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function ChatTest() {

    const onMessage = (payload) => {
        console.log('message recieved', payload);
    };

    const onConnected = (stompClient, nickname, fullname, onMessageReceived) => {
        stompClient.subscribe(`/user/${nickname}/queue/messages`, onMessageReceived);
        stompClient.subscribe(`/user/public`, onMessageReceived);
        console.log('connected');
        // register the connected user
        stompClient.send("/app/user.addUser",
            {},
            JSON.stringify({ nickName: nickname, fullName: fullname, status: 'ONLINE' })
        );
    };

    const connect = (event) => {
        const nickname = "someName";
        const fullname = "Some Full Name";

        const socket = new SockJS('http://localhost:8080/v1/chat/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => { onConnected(stompClient, nickname, fullname, onMessage) }, () => { console.log('error!') });

        event.preventDefault();
    };

    return (
        <div className="flex flex-col items-center">
            <button type="button" className="bg-red-500 rounded-lg p-4 focus:bg-red-900 text-white hover:text-sky-50" onClick={connect} > PressMe Bro</button>
        </div>);
}
