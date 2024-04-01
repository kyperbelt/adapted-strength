import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient=null;
let nickname = null;
let fullname = null;
let usertype = null;
let message = null;


// This series of "connect" functions each connect a user to websocket connection.
// In the actual implementation of this we would grab the nickname (email), fullname and usertype from the logged in user
// Note: usertype will eventually be scrapped. We need to use JWT tokens to check for permissions in the long run
function connect1(event){
    nickname = "alex@adaptedstrength.com"
    fullname = "Alex Palting"
    usertype = "COACH"

    const socket = new SockJS('http://localhost:8080/v1/chat/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError)
    event.preventDefault();

}

function connect2(event){
    nickname = "bob@gmail.com";
    fullname = "Bob Doe";
    usertype = "CLIENT"

    const socket = new SockJS('http://localhost:8080/v1/chat/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError)
    event.preventDefault();

    return <div className="flex flex-col items-center"><MyButton text={"Connect2"} onClick={connect2}/></div>;    
}

function connect3(event){
    nickname = "john@aol.com"
    fullname = "John Bon"
    usertype = "CLIENT"

    const socket = new SockJS('http://localhost:8080/v1/chat/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError)
    event.preventDefault();

    return <div className="flex flex-col items-center"><MyButton text={"Connect3"} onClick={connect3}/></div>;    
}


// This series of "x to y" functions demonstrate how message sending will work
// senderId will be grabbed from the current user
// recipientId will likely be grabbed from a list of available users
// content will be typed in by the user
function alexToBob(event){
    const chatMessage={
        senderId: "alex@adaptedstrength.com",
        recipientId: "bob@gmail.com",
        content: "Hello Bob, this is Alex",
        timeStamp: new Date()
    };
    stompClient.send("/v1/chat/app/processMessage", {}, JSON.stringify(chatMessage));
    event.preventDefault();
}

function alexToJohn(event){
    const chatMessage={
        senderId: "alex@adaptedstrength.com",
        recipientId: "john@aol.com",
        content: "Hello John, this is Alex",
        timeStamp: new Date()
    };
    stompClient.send("/v1/chat/app/processMessage", {}, JSON.stringify(chatMessage));
    event.preventDefault();
}

function bobToAlex(event){
    const chatMessage={
        senderId: "bob@gmail.com",
        recipientId: "alex@adaptedstrength.com",
        content: "Hello Alex, this is Bob",
        timeStamp: new Date()
    };
    stompClient.send("/v1/chat/app/processMessage", {}, JSON.stringify(chatMessage));
    event.preventDefault();
}

function johnToAlex(event){
    const chatMessage={
        senderId: "john@aol.com",
        recipientId: "alex@adaptedstrength.com",
        content: "Hello Alex, this is John",
        timeStamp: new Date()
    };
    stompClient.send("/v1/chat/app/processMessage", {}, JSON.stringify(chatMessage));
    event.preventDefault();
}

// This function demonstrates how subscribing to a topic works. 
// Each user will have a queue of messages that they subscribe to
function onConnected(){
    stompClient.subscribe(`/v1/chat/user/${nickname}/queue/messages`, onMessageReceived);
    console.log('connected');

    // register the connected user
    stompClient.send("/v1/chat/app/chatUser.addUser",{}, JSON.stringify({ email: nickname, fullName: fullname, userType : usertype }));
}

function onError(){
    console.log("error");
}

async function onMessageReceived(payload){
    console.log('Message recieved', payload);

}

// This just displays different buttons for testing purposes
export default function ChatTest() {
    return (
        <div className="flex flex-col items-center">
            <MyButton text={"Connect1"} onClick={connect1}/>
            <MyButton text={"Connect2"} onClick={connect2}/>
            <MyButton text={"Connect3"} onClick={connect3}/>

            <MyButton text={"SendMessage1"} onClick={alexToBob}/>
            <MyButton text={"SendMessage2"} onClick={alexToJohn}/>
            <MyButton text={"SendMessage3"} onClick={bobToAlex}/>
            <MyButton text={"SendMessage4"} onClick={johnToAlex}/>
        </div>);     
}

function MyButton({text, ...props}){
    return (<button type="button" className="bg-red-500 rounded-lg p-4 focus:bg-red-900 text-white hover:text-sky-50" {...props} > {text}</button>);

}
