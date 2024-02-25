import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function ChatTest() {

    const onMessage = (payload) => {
        console.log('message recieved', payload);
    };

    const connect = (event) => {
        const nickname = "bob@gmail.com";
        const fullname = "Bob Doe";
        const usertype = "CLIENT"
        const nickname2 = "john@aol.com"
        const fullname2 = "John Bon"
        const usertype2 = "CLIENT"
        const nickname3 = "alex@adaptedstrength.com"
        const fullname3 = "Alex Palting"
        const usertype3 = "COACH"


        const socket = new SockJS('http://localhost:8080/v1/chat/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => { onConnected(stompClient, nickname, fullname, usertype, onMessage) }, () => { console.log('error!') });

        // stompClient.connect({}, () => { onConnected(stompClient, nickname2, fullname2, usertype2,onMessage) }, () => { console.log('error!') });

        // stompClient.connect({}, () => { onConnected(stompClient, nickname3, fullname3, usertype3,onMessage) }, () => { console.log('error!') });
        
        const chatMessage={
            senderId: "bob@gmail.com",
            recipientId: "alex@adaptedstrength.com",
            content: "Hello Alex, this is Bob",
            timestamp: new Date()
        };
        const chatMessage2={
            senderId: "john@aol.com",
            recipientId: "alex@adaptedstrength.com",
            content: "Hello Alex, this is John",
            timestamp: new Date()
        };
        const chatMessage3={
            senderId: "alex@adaptedstrength.com",
            recipientId: "bob@gmail.com",
            content: "Hello Bob, this is Alex",
            timestamp: new Date()
        };
        const chatMessage4={
            senderId: "alex@adaptedstrength.com",
            recipientId: "john@aol.com",
            content: "Hello John, this is Alex",
            timestamp: new Date()
        };
        
        stompClient.send("/v1/chat/app/processMessage", {}, JSON.stringify(chatMessage))
        // stompClient.send("/v1/chat/app/processMessage", {}, JSON.stringify(chatMessage2))
        // stompClient.send("/v1/chat/app/processMessage", {}, JSON.stringify(chatMessage3))
        // stompClient.send("/v1/chat/app/processMessage", {}, JSON.stringify(chatMessage4))
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
