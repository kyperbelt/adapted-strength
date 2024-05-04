import {useState, useEffect} from "react";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {UserApi} from "../api/UserApi";
import {ChatApi} from "../api/ChatApi";
import {ApiUtils} from "../api/ApiUtils";
import {HttpStatus} from "../api/ApiUtils";

// Solution: Add a reference to a coach from the <user_table_name> to another user that is a coach
const COACH = {
    "firstName": "Alex",
    "lastName": "Palting",
    "email": "admin@email.com"
};

function MessageConstructor({userInfo, chatInfo}) {
    const date = new Date(chatInfo.timeStamp);
    const dateFormat = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });
    let messagePosition = "flex";
    let messageFullName = `${userInfo.firstName} ${userInfo.lastName}`;
    let messageBackground = "flex flex-col p-2 border-gray-200 rounded-xl";
    let messageText = "text-sm font-normal break-words"; // text-white || text-gray-900

    if (userInfo.email === chatInfo.senderId) {
        messagePosition += " justify-end";
        messageBackground += " bg-custom-red";
        messageText += " text-white";
    } else {
        messageFullName = `${COACH.firstName} ${COACH.lastName}`;
        messageBackground += " bg-gray-200";
        messageText += " text-gray-900";
    }

    return (
        <>
            <div className={messagePosition}>
                <div className="flex flex-col w-full gap-0.5 max-w-[65vw]">
                    <div className="flex items-center space-x-2">
                        <span
                            className="mt-2 text-sm font-semibold text-gray-900">{messageFullName}</span>
                        <span className="mt-2 text-sm font-normal text-gray-500">{dateFormat}</span>
                    </div>
                    <div
                        className={messageBackground}>
                        <p className={messageText}>{chatInfo.content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

let stompClient = null;

export default function Chat() {
    const [userInfo, setUserInfo] = useState(null);
    const [chatInfo, setChatInfo] = useState(null);
    const [userMessage, setUserMessage] = useState({
        "senderId": "",
        "recipientId": "",
        "content": "",
        "timeStamp": ""
    });
    const [userVideo, setUserVideo] = useState("");
    let container = "flex flex-col h-[calc(100vh-104px)]";

    useEffect(() => {
        const loadData = () => {
            UserApi.getProfileInformation()
                .then(userResponse => {
                    if (userResponse.status === HttpStatus.OK) {
                        return userResponse.data;
                    } else {
                        throw new Error(`Error occurred when fetching user profile information\nHTTP Status: ${userResponse.status}`);
                    }
                })
                .then(userData => {
                    setUserInfo(userData);
                    return ChatApi.getChat(userData.email, COACH.email)
                        .then(senderResponse => {
                            if (senderResponse.status === HttpStatus.OK) {
                                return {userData, senderData: senderResponse.data};
                            } else {
                                throw new Error(`Error occurred when fetching sender's chat information\nHTTP Status: ${senderResponse.status}`);
                            }
                        })
                })
                .then(({userData, senderData}) => {
                    return ChatApi.getChat(COACH.email, userData.email)
                        .then(recipientResponse => {
                            if (recipientResponse.status == HttpStatus.OK) {
                                return {senderData, recipientData: recipientResponse.data};
                            } else {
                                throw new Error(`Error occurred when fetching recipient's chat information\nHTTP Status: ${recipientResponse.status}`)
                            }
                        })
                })
                .then(({senderData, recipientData}) => {
                    //TODO: investigate whether the time complexity of concat to an empty array from a populated array is affected
                    //e.g. let a = [], let b = [1,2], a.concat(b) --> does this change the reference of the head or are all the elements being copied
                    //issue is O(1) compared to O(n)
                    setChatInfo(senderData.concat(recipientData).sort((a, b) => a.timeStamp > b.timeStamp));
                })
                .catch(e => {
                    console.error(e);
                })
        }

        loadData()
    }, []);

    const registerUser = () => {
        const socket = new SockJS(`http://localhost:8080/ws?jwtToken=${ApiUtils.getAuthToken()}`)
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe(`/user/${userInfo.email}/queue/messages`, onMessageReceived);
        // stompClient.send("/app/chatUser.addUser", {
        //     //TODO: investigate if this is getting sent
        //     Authorization: `Bearer ${ApiUtils.getAuthToken()}`
        // }, JSON.stringify({
        //     email: userInfo.email,
        //     fullName: `${userInfo.firstName} ${userInfo.lastName}`
        // }))
    };

    const onError = (e) => {
        console.log(e);
    };

    const onMessageReceived = (payload) => {
        const data = JSON.parse(new TextDecoder().decode(payload._binaryBody));

        const receivedMessage = {
            "senderId": data.senderId,
            "recipientId": data.recipientId,
            "content": data.content,
            "timeStamp": new Date(data.timeStamp)
        };

        setChatInfo(prevChatInfo => [...prevChatInfo, receivedMessage]);
    };

    if (!(userInfo && chatInfo))
        return <div>Fetching APIs...</div>

    if (!stompClient) {
        registerUser();
    }

    const generateChatMap = (messages) => {
        let currentDateFormat;
        let list;
        const map = new Map();

        messages.forEach((message) => {
            let messageDate = new Date(message.timeStamp);
            let messageDateFormat = messageDate.toLocaleDateString("en-US", {
                "month": "2-digit",
                "day": "2-digit",
                "year": "numeric"
            })

            if (currentDateFormat !== messageDateFormat) {
                list = [];
                map.set(messageDateFormat, list);
                currentDateFormat = messageDateFormat;
                list.push(message);
            } else {
                list.push(message);
            }
        })

        return map;
    };

    const ChatList = ({messages}) => {
        //TODO: make sure that if the data is already sorted just generate on message received
        const chatMap = generateChatMap(messages);
        const chatList = [];
        let counter = 1;

        for (let key of chatMap.keys()) {
            let dateFormat = new Date(key).toLocaleDateString("en-US", {
                "weekday": "short",
                "month": "short",
                "day": "numeric"
            })

            chatList.push(<li key={`date-${counter}`}>
                <div className="flex justify-center text-sm font-normal text-gray-500 pb-2">{dateFormat}</div>
            </li>);
            counter++;

            for (let message of chatMap.get(key)) {
                chatList.push(<li key={message.id}>
                    <MessageConstructor userInfo={userInfo} chatInfo={message}/>
                </li>);
            }

        }

        return (<ul>
                {chatList}
            </ul>
        );
    };

    const handleUserMessage = (e) => {
        setUserMessage({
            "senderId": userInfo.email,
            "recipientId": COACH.email,
            "content": e.target.value,
            "timeStamp": new Date()
        });
    };

    const handleUserVideo = (e) => {
        setUserVideo(e.target.files[0].name);
    }

    const sendUserMessage = () => {
        if (userMessage.content !== "") {
            setChatInfo([...chatInfo, userMessage]);
            stompClient.send("/app/processMessage", {}, JSON.stringify(userMessage));
            //resets chat for next message
            setUserMessage({
                ...userMessage,
                "content": "",
                "timeStamp": ""
            });
            setUserVideo("");
        }
    };

    return (
        <div className={container}>
            <div id="chat-title" className="mx-2 mt-2 flex justify-center border border-gray-200 p-2 rounded-t-xl bg-gray-200 text-gray-900 font-semibold">
                Chatting with {`${COACH.firstName} ${COACH.lastName}`}
            </div>
            <div id="chat-message" className="mx-2 p-4 bg-white border-x border-gray-200 overflow-auto flex-grow">
                <ChatList messages={chatInfo}/>
            </div>
            <div id="chat-controls" className="mx-2 mb-2 border border-gray-200 p-4 rounded-b-xl bg-gray-200">
                <div className="border mb-4 p-2 w-full bg-white text-gray-900 rounded-xl break-words">
                    {userVideo === "" ? "No files selected." : userVideo}
                </div>
                <div className="flex w-full items-center">
                    <input id="chat-attach-file" type="file" id="file-input" className="hidden" onChange={handleUserVideo}/>
                    <label htmlFor="file-input" className="h-8 w-8 rounded-full bg-custom-red mr-2 hover:bg-custom-dark-red cursor-pointer">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-1.5">
                            <path d="M13.5 3H12H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H7.5M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V9.75V12V19C19 20.1046 18.1046 21 17 21H16.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 21L12 13M12 13L14.5 15.5M12 13L9.5 15.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </label>
                    <input id="chat-input-box" type="text" placeholder="Type your message..." className="flex-1 rounded-full px-4 py-2 border border-gray-200 focus:outline-none" value={userMessage.content} onChange={handleUserMessage}/>
                    <button id="chat-submit" className="h-8 w-8 rounded-full ml-2 bg-custom-red hover:bg-custom-dark-red" onClick={sendUserMessage}>
                        <svg className="fill-current fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7V17M12 7L16 11M12 7L8 11" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}