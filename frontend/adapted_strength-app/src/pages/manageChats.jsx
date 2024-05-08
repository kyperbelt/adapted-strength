import React, {useState, useEffect, useRef} from "react";

import {ChatApi} from "../api/ChatApi";
import {ApiUtils, HttpStatus} from '../api/ApiUtils';
import PageContainer1 from "../components/PageContainer";
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import ReactPlayer from "react-player";
//import { useWebSocket } from './WebSocketContext';

let stompClient = null;
let nickname = null;
let fullname = null;
let message = null;

// const coachId = 'alex@email.com';  //placeholder for now


function connectUser(nickname, fullname, event) {
    const socket = new SockJS(`http://localhost:8080/ws?jwtToken=${ApiUtils.getAuthToken()}`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError)
    event.preventDefault();
}

function onConnected() {
    stompClient.subscribe(`/user/${nickname}/queue/messages`, onMessageReceived);
    stompClient.subscribe(`user/public`, onMessageReceived);
    console.log('connected');

    // register the connected user
    stompClient.send("/app/chatUser.addUser", {}, JSON.stringify({email: nickname, fullName: fullname}));
}


function onError() {
    console.log("error");
}

async function onMessageReceived(payload) {
    console.log('Message recieved', payload);

}

/*messages.then((resolvedValue) => {
  console.log("start");
  console.log(resolvedValue); // This will log the resolved value of the promise
  console.log("tempMes" + resolvedValue.messages); // This will log the messages array
  tempMessages = resolvedValue.messages;
  console.log(resolvedValue.hasUnread); // This will log the value of hasUnread
  console.log("end");
});*/
//converting "YYYY-MM-DD-HH-MM-SS" "YYYY-MM-DDTHH:MM:SS"
//const sortedMessages = tempMessages && Array.isArray(tempMessages) ? tempMessages.sort((a, b) => {
/*const sortedMessages = tempMessages.sort((a, b) => {
  const partsA = a.timeStamp.split('-');
  const partsB = b.timeStamp.split('-');
  return new Date(`${partsA[0]}-${partsA[1]}-${partsA[2]}T${partsA[3]}:${partsA[4]}:${partsA[5]}`) - new Date(`${partsB[0]}-${partsB[1]}-${partsB[2]}T${partsB[3]}:${partsB[4]}:${partsB[5]}`);
});*/

function getChatMessages(userEmail, coachEmail) {
    return ChatApi.getChat(coachEmail, userEmail).then((response) => {
        if (response.status === HttpStatus.OK) {
            const chat1 = response;
            console.log('Chat 1:', chat1.data);
            console.log('coach:', coachEmail);
            console.log('user:', userEmail);
            console.log("Bye");

            console.log([chat1.data]);


            const messages = [...chat1.data];
            const hasUnread = messages.some(message => message.hasBeenRead === false);

            return {
                messages: messages,
                hasUnread: hasUnread
            }
        }
    });
}

const Popup = ({user, onClose, coach}) => {
    //var tempMessages;
    const [messages, setMessages] = useState([]);
    const [hasUnread, setHasUnread] = useState(false);

    const [msg, setMsg] = useState("");

    const userEmail = user.email;

    const containerRef = useRef(null);

    const handleChange = (event) => {
        setMsg(event.target.value);
    };

    const sendMessage = async () => {
        const chatMessage = {
            senderId: coach.email,
            recipientId: userEmail,
            content: msg,
            timeStamp: new Date(),
        };
        if (msg !== "") {
          console.log("Look at me", chatMessage);
            stompClient.send("/app/processMessage", {}, JSON.stringify(chatMessage));

            const chatRoomID = coach.email + "_" + userEmail;

            // Format 2024-04-14T23:32:03.665+00:00
            const newTimeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const newChatMessge = {
                chatRoomID: chatRoomID,
                senderId: coach.email,
                recipientId: userEmail,
                content: msg,
                timeStamp: newTimeStamp,
                hasBeenRead: true
            }

            const newMessages = [...messages, newChatMessge];
            console.log(newMessages);
            setMessages(newMessages);
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }

        }
        setMsg("");
    }

    useEffect(() => {
        //const chat2 = await ChatApi.getChat(coach.email, userId);  //remove
        getChatMessages(userEmail, coach.email, setMessages, setHasUnread).then((data) => {
            setMessages(data.messages);
            setHasUnread(data.hasUnread);

            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        });
    }, [])

    function formatTime(timeStamp) {
        const date = new Date(timeStamp);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${hours}:${minutes} - ${month}/${day}`;
    }

    return (
        (<div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-4 rounded-md w-96">
            <div className="popup-content">
                <h2 className="text-center mb-4">{user.fullname}</h2>
                <div className="overflow-y-auto max-h-96" ref={containerRef}>
                    {messages.map((message, index) => (
                        <div key={index}
                             className={`my-2 p-2 ${message.senderId === user.email ? 'text-right' : 'text-left'}`}>
                            <div
                                className={`bg-gray-200 rounded-lg py-2 px-4 inline-block ${message.senderId === user.email ? 'bg-red-300 text-black' : 'bg-gray-300'}`}>
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs">{formatTime(message.timeStamp)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-custom-gray p-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                        onChange={handleChange} // Attach handleChange function to handle changes in the input field
                        value={msg} // Set input value to msg state variable
                    />
                    <button
                        className="rounded-full bg-custom-red block p-2 ml-2 hover:bg-custom-dark-red"
                        onClick={sendMessage} // Attach sendMessage function to handle message submission
                    >
                        Send
                    </button>
                </div>

                <button onClick={onClose}
                        className="block mx-auto mt-4 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-600 ">Close
                </button>
            </div>
        </div>)
    );
};


function CoachChat() {
    const [userChats, setUserChats] = useState([]);

    const coach = {
        email: "admin@email.com",
        fullname: "Alex Palting",
        userType: "COACH"
    };

    useEffect(() => {
        console.log(coach);
        ChatApi.getChatUsers(coach)
            .then(chats => {
                setUserChats(chats.data);
                console.log('userChats:', chats.data);
            })
            .catch(error => {
                console.error('Error fetching user chats:', error);
            });
    }, []);


    const [popupUser, setPopupUser] = useState(null);

    // Function to handle opening popup
    const openPopup = (user) => {
        //set have unread messages to false here
        setPopupUser(user);

        //Connect to websocket and listen for new messages from this
        nickname = "admin@email.com"
        fullname = "Alex Palting"

        const socket = new SockJS(`http://localhost:8080/ws?jwtToken=${ApiUtils.getAuthToken()}`);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError)
    };

    function onConnected() {
        stompClient.subscribe(`/user/${nickname}/queue/messages`, onMessageReceived);
        stompClient.subscribe(`user/public`, onMessageReceived);
        console.log('connected');

        // register the connected user
        stompClient.send("/app/chatUser.addUser", {}, JSON.stringify({email: nickname, fullName: fullname}));
    }


    function onError() {
        console.log("error");
    }

    async function onMessageReceived(payload) {
        console.log('Message recieved', payload);

    }


    // Function to handle closing popup
    const closePopup = () => {
        setPopupUser(null);
    };

    async function checkHasBeenRead(user) {
        try {
            const response = await ChatApi.getUserHasUnread(user.id); // Assuming user.id is the receiverId
            console.log(response.data); // If response is false (no unread messages), return true; otherwise, return false
        } catch (error) {
            console.error('Error checking if user has unread messages:', error);
            return false; // Default to false in case of any error
        }
    }

    const [userUnread, setUserUnread] = useState(false);

    /*useEffect(() => {
      userChats.map((user, index) => (
        ChatApi.getUserHasUnread(user.id).then((response) => {
          if (response.status === HttpStatus.OK) {
            const userHasUnread = response;
            console.log('user has unread:', userHasUnread.data.payload);

            setUserUnread(userHasUnread.data.payload === "true");
          }
        })}, [userChats]);*/


    return (
        <PageContainer1>
            <div className="relative bottom-200">
                <div className="flex w-full justify-center">
                    <div className="bg-gray-100 rounded-lg shadow-md p-6 max-w-lg w-full">
                        <ul className="space-y-4">
                            {userChats.map((user, index) => (
                                <li className="hover:bg-gray-200" key={index}>
                                    <button className="text-black " onClick={() => openPopup(user)}>
                                        {user.fullName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {popupUser && <Popup user={popupUser} onClose={closePopup} coach={coach}/>}
                    </div>
                </div>
            </div>
        </PageContainer1>
    );
}

export default CoachChat;
