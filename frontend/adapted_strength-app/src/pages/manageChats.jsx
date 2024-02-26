import React, { useState } from "react";
//import React, { useState, useEffect } from "react"; //uncomment when connecting to  backend API

// import { ChatApi } from "../api/ChatApi";
import PageContainer1 from "../components/PageContainer";

// const coachId = 'alex@email.com';  //placeholder for now

const Popup = ({ user, messages, onClose }) => {
    //converting "YYYY-MM-DD-HH-MM-SS" "YYYY-MM-DDTHH:MM:SS"
    const sortedMessages = messages.sort((a, b) => {
      const partsA = a.timeStamp.split('-');
      const partsB = b.timeStamp.split('-');
      return new Date(`${partsA[0]}-${partsA[1]}-${partsA[2]}T${partsA[3]}:${partsA[4]}:${partsA[5]}`) - new Date(`${partsB[0]}-${partsB[1]}-${partsB[2]}T${partsB[3]}:${partsB[4]}:${partsB[5]}`);
    });
  
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-4 rounded-md w-96">
        <div className="popup-content">
          <h2 className="text-center mb-4">{user.fullname}</h2>
          <div className="overflow-y-auto max-h-96">
            {sortedMessages.map((message, index) => (
              <div key={index} className={`my-2 p-2 ${message.senderId === user.email ? 'text-right' : 'text-left'}`}>
                <div className={`bg-gray-200 rounded-lg py-2 px-4 inline-block ${message.senderId === user.email ? 'bg-red-300 text-black' : 'bg-gray-300'}`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs">{message.timeStamp}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={onClose} className="block mx-auto mt-4 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-600 ">Close</button>
        </div>
      </div>
    );
  };

/** This function is commented out so we can test with our dummy data, uncomment when connecting to backend */
/*function ChatComponent({ chats, user_1_chat, user_2_chat, user_3_chat, user_4_chat, user_5_chat }) {
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    async function fetchAllMessages() {
      try {
        const messagesPromises = [];

        [user_1_chat, user_2_chat, user_3_chat, user_4_chat, user_5_chat].forEach(chat => {
          messagesPromises.push(...chat);
        });
        
        /** when conncted to backend */
        /*
        for (let i = 0; i < chatUsers.length; i++) {
            const user = chatUsers[i];
            //messagesPromises.push(ChatApi.getChat({ senderId: user.email, receiverId: coachId })); //uncomment when connected to backend
            //messagesPromises.push(ChatApi.getChat({ senderId: coachId, receiverId: user.email })); //uncomment when connected to backend
          }
        /

        const messagesResults = await Promise.all(messagesPromises);
        const allMessages = messagesResults.flat(); 
        allMessages.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
        setAllMessages(allMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    fetchAllMessages();
  }, [user_1_chat, user_2_chat, user_3_chat, user_4_chat, user_5_chat]);

  return (
        <div>
          <h2>All Chat Messages</h2>
          <ul>
            {allMessages.map((message, index) => (
              <li key={index}>
                {message.content} ({message.timeStamp})
              </li>
            ))}
          </ul>
        </div>
  );
}
*/


function CoachChat() {
  const chatUsers = [
    {"email": "user1@email.com", "fullname": "Jack Jones", "userType": "C"},
    {"email": "user2@email.com", "fullname": "Bob Smith", "userType": "C"},
    {"email": "user3@email.com", "fullname": "Amy Johnson", "userType": "C"},
    {"email": "user4@email.com", "fullname": "Rose White", "userType": "C"},
    {"email": "user5@email.com", "fullname": "Ray Madison", "userType": "C"}
  ];
  
  const user_1_chat = {
    "hasUnread": true,
    "messages": [
    {"chatId": "user1@email.com_alex@email.com", "senderId": "user1@email.com", "recipientId": "alex@email.com", "content": "1 first message", "timeStamp": "2024-02-24-17-15-27"},
    {"chatId": "user1@email.com_alex@email.com", "senderId": "user1@email.com", "recipientId": "alex@email.com", "content": "1 second message", "timeStamp": "2024-02-24-17-17-27"},
    {"chatId": "user1@email.com_alex@email.com", "senderId": "user1@email.com", "recipientId": "alex@email.com", "content": "1 third message", "timeStamp": "2024-02-24-18-11-47"},
    {"chatId": "alex@email.com_user1@email.com", "senderId": "alex@email.com", "recipientId": "user1@email.com", "content": "1 coach message", "timeStamp": "2024-02-24-17-20-47"}
    ],
};

  const user_2_chat = {
    "hasUnread": true,
    "messages": 
  [
  {"chatId": "user2@email.com_alex@email.com", "senderId": "user2@email.com", "recipientId": "alex@email.com", "content": "2 first message", "timeStamp": "2024-02-24-17-15-27"},
  {"chatId": "user2@email.com_alex@email.com", "senderId": "user2@email.com", "recipientId": "alex@email.com", "content": "2 second message", "timeStamp": "2024-02-24-17-17-27"},			
  {"chatId": "user2@email.com_alex@email.com", "senderId": "user2@email.com", "recipientId": "alex@email.com", "content": "2 third message", "timeStamp": "2024-02-24-18-11-47"}
  ]}
  ;
const user_3_chat ={
    "hasUnread": false,
    "messages":    
    [
        {"chatId": "user1@email.com_alex@email.com", "senderId": "user3@email.com", "recipientId": "alex@email.com", "content": "3 first message", "timeStamp": "2024-02-24-17-15-27"},
        {"chatId": "user1@email.com_alex@email.com", "senderId": "user3@email.com", "recipientId": "alex@email.com", "content": "3 second message", "timeStamp": "2024-02-24-17-17-27"},			
        {"chatId": "user1@email.com_alex@email.com", "senderId": "user3@email.com", "recipientId": "alex@email.com", "content": "3 third message", "timeStamp": "2024-02-24-18-11-47"}
        ]
} ;
const user_4_chat = {
    "hasUnread": true,
    "messages": [
        {"chatId": "user4@email.com_alex@email.com", "senderId": "user4@email.com", "recipientId": "alex@email.com", "content": "4 first message", "timeStamp": "2024-02-24-17-15-27"},
        {"chatId": "user4@email.com_alex@email.com", "senderId": "user4@email.com", "recipientId": "alex@email.com", "content": "4 second message", "timeStamp": "2024-02-24-17-17-27"},			
        {"chatId": "user4@email.com_alex@email.com", "senderId": "user4@email.com", "recipientId": "alex@email.com", "content": "4 third message", "timeStamp": "2024-02-24-18-11-47"}
        ]
};
const user_5_chat = {
    "hasUnread": false,
    "messages": 
  [
  {"chatId": "user5@email.com_alex@email.com", "senderId": "user5@email.com", "recipientId": "alex@email.com", "content": "5 first message", "timeStamp": "2024-02-24-17-15-27"},
  {"chatId": "user5@email.com_alex@email.com", "senderId": "user5@email.com", "recipientId": "alex@email.com", "content": "5 second message", "timeStamp": "2024-02-24-17-17-27"},			
  {"chatId": "user5@email.com_alex@email.com", "senderId": "user5@email.com", "recipientId": "alex@email.com", "content": "5 third message", "timeStamp": "2024-02-24-18-11-47"}
  ]
};


  const [popupUser, setPopupUser] = useState(null);

  // Function to handle opening popup
  const openPopup = (user) => {
    //set have unread messages to false here
    setPopupUser(user);
  };

  // Function to handle closing popup
  const closePopup = () => {
    setPopupUser(null);
  };

  const getUserMessages = (userId) => {  //remove when connected to backend, temp helper function
    switch (userId) {
      case 'user1@email.com':
        return user_1_chat;
      case 'user2@email.com':
        return user_2_chat;
      case 'user3@email.com':
        return user_3_chat;
      case 'user4@email.com':
        return user_4_chat;
      case 'user5@email.com':
        return user_5_chat;
      default:
        return [];
    }
  };

  return (
    <PageContainer1>
        <div className="relative bottom-200">
        <div className="flex w-full justify-center">
        <div className="bg-gray-100 rounded-lg shadow-md p-6 max-w-lg w-full">
          <ul className="space-y-4">
            {chatUsers.map((user, index) => (
              <li className="hover:bg-gray-200" key={index}>
                <button className="text-black " onClick={() => openPopup(user)}>{user.fullname} {user.email !== 'alex@email.com' && getUserMessages(user.email)?.hasUnread && <span className="text-red-500">New</span>}</button>
              </li>
            ))}
          </ul>
          {popupUser && <Popup user={popupUser} messages={getUserMessages(popupUser.email).messages} onClose={closePopup} />}
        </div>
      </div>
      </div>
    </PageContainer1>
  );
}
/**/
export default CoachChat;