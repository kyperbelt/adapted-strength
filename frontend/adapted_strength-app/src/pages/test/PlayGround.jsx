import {useState, useEffect} from "react";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {UserApi} from "../../api/UserApi";
import {ChatApi} from "../../api/ChatApi";
import {HttpStatus} from "../../api/ApiUtils"

// Solution: Add a reference to a coach from the <user_table_name> to another user that is a coach
const COACH = {
    "firstName": "Alex",
    "lastName": "Palting",
    "email": "admin@email.com"
};

function Message({userInfo, chatInfo}) {
    const date = new Date(chatInfo.timeStamp);
    const dateFormat = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        userInfo.email === chatInfo.senderId ?
            <>
                <div className="flex justify-end">
                    <div className="flex flex-col gap-1 w-full max-w-[170px]">
                        <div className="flex items-center space-x-2 rtl">
                        <span
                            className="text-sm font-semibold text-gray-900">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                            <span className="text-sm font-normal text-gray-500">{dateFormat}</span>
                        </div>
                        <div
                            className="flex flex-col leading-1.5 p-4 border-gray-200 bg-custom-red rounded-xl">
                            <p className="text-sm font-normal text-white break-words">{chatInfo.content}</p>
                        </div>
                    </div>
                </div>
            </>
            :
            <>
                <div className="flex">
                    <div className="flex flex-col gap-1 w-full max-w-[170px]">
                        <div className="flex items-center space-x-2 rtl">
                        <span
                            className="text-sm font-semibold text-gray-900">{`${COACH.firstName} ${COACH.lastName}`}</span>
                            <span className="text-sm font-normal text-gray-500">{dateFormat}</span>
                        </div>
                        <div
                            className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl">
                            <p className="text-sm font-normal text-gray-900 break-words">{chatInfo.content}</p>
                        </div>
                    </div>
                </div>
            </>
    )
}

let stompClient = null;

export default function PlayGround() {
    const [userInfo, setUserInfo] = useState(null);
    const [chatInfo, setChatInfo] = useState(null);
    const [userMessage, setUserMessage] = useState({
        "senderId": "",
        "recipientId": "",
        "content": "",
        "timeStamp": ""
    });
    const [userVideo, setUserVideo] = useState("");

    useEffect(() => {
        try {
            UserApi.getProfileInformation()
                .then(userResponse => {
                    if (userResponse.status === HttpStatus.OK) {
                        setUserInfo(userResponse.data);
                        //first async call return value is parameter for next one
                        return userResponse.data;
                    }
                    throw Error(`Unable to get User Profile Information\nHTTP Status: ${userResponse.status}`);
                })
                .then((fetchedResponse) => {
                    ChatApi.getChat(fetchedResponse.email, COACH.email)
                        .then(chatResponse => {
                            if (chatResponse.status === HttpStatus.OK) {
                                setChatInfo(chatResponse.data);
                            } else {
                                throw Error(`Unable to get Chat Messages\nHTTP Status: ${chatResponse.status}`)
                            }
                        })
                    });
        } catch (e) {
            console.log(e);
        }
    }, []);


    if (!userInfo) return (<>Loading</>);

    const registerUser = () => {
        const socket = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe(`/user/${userInfo.email}/queue/messages`, onMessageReceived);
        stompClient.send("/app/chatUser.addUser", {}, JSON.stringify({
            email: userInfo.email,
            fullName: `${userInfo.firstName} ${userInfo.lastName}`
        }));
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

        setChatInfo([...chatInfo, receivedMessage]);
    };

    registerUser();

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
        const chatMap = generateChatMap(messages);
        const chatList = [];

        for (let key of chatMap.keys()) {
            let dateFormat = new Date(key).toLocaleDateString("en-US", {
                "weekday": "short",
                "month": "short",
                "day": "numeric"
            })

            chatList.push(<div className="flex justify-center text-sm font-normal text-gray-500">{dateFormat}</div>);

            for (let message of chatMap.get(key)) {
                chatList.push(<Message userInfo={userInfo} chatInfo={message}/>);
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
            setUserMessage({
                ...userMessage,
                "content": "",
                "timeStamp": ""
            });
            setUserVideo("");
        }
    };

    return (<div className="bg-white m-2 rounded-lg p-2">
            <div className="flex justify-center font-semibold border-gray-200 bg-gray-100 text-gray-900 p-2">Chatting
                with {`${COACH.firstName} ${COACH.lastName}`}</div>
            <div className="flex-1 overflow-y-auto p-4">
                {userInfo && chatInfo ? <ChatList messages={chatInfo}/> : "Loading..."}
            </div>
            <div className="border-gray-200 bg-gray-100 p-4">
                <div className="border mb-4 p-2 w-full bg-white text-gray-900 rounded-xl">{userVideo === "" ? "No files selected." : userVideo}</div>
                <div className="flex items-center">
                    <input type="file" id="file-input" className="hidden" onChange={handleUserVideo}/>
                    <label htmlFor="file-input"
                           className="flex justify-center w-7 h-7 rounded-full bg-custom-red  mr-2 text-white font-semibold hover:bg-custom-dark-red cursor-pointer">+</label>
                    <input type="text" placeholder="Type your message..."
                           className="flex-1 border rounded-full px-4 py-2 focus:outline-none" value={userMessage.content}
                           onChange={handleUserMessage}/>
                    <button
                        className="rounded-full bg-custom-red block p-2 ml-2 text-white font-semibold hover:bg-custom-dark-red"
                        onClick={sendUserMessage}>Send
                    </button>
                </div>
            </div>
        </div>
    );
}