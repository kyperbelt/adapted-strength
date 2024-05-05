import {useEffect, useState} from "react";
import {UserApi} from "../api/UserApi";
import {ApiUtils, HttpStatus} from "../api/ApiUtils";
import {ChatApi} from "../api/ChatApi";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

let stompClient = null;

function MessageConstructor({senderInfo, recipientInfo, chatInfo}) {
    const date = new Date(chatInfo.timeStamp);
    const dateFormat = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });
    let messagePosition = "flex";
    let messageFullName = `${senderInfo.firstName} ${senderInfo.lastName}`;
    let messageBackground = "flex flex-col p-2 border-gray-200 rounded-xl";
    let messageText = "text-sm font-normal break-words"; // text-white || text-gray-900

    if (senderInfo.email === chatInfo.senderId) {
        messagePosition += " justify-end";
        messageBackground += " bg-custom-red";
        messageText += " text-white";
    } else {
        messageFullName = recipientInfo.fullName;
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

function ChatPopUp({senderInfo, recipientInfo, className, onCloseDialog, senderMessage, setSenderMessage, senderVideo, setSenderVideo, updateUnread, setUpdateUnread}) {
    const [chatInfo, setChatInfo] = useState(null);

    useEffect(() => {
        const loadData = () => {
            ChatApi.getChat(senderInfo.email, recipientInfo.email)
                .then(senderChatResponse => {
                    if (senderChatResponse.status === HttpStatus.OK) {
                        return senderChatResponse.data
                    } else {
                        throw new Error(`Error occurred when fetching sender's chat information\nHTTP Status: ${senderChatResponse.status}`);
                    }
                })
                .then(senderChatData => {
                    return ChatApi.getChat(recipientInfo.email, senderInfo.email)
                        .then(recipientChatResponse => {
                            if (recipientChatResponse.status === HttpStatus.OK) {
                                return {senderChatData, recipientChatData: recipientChatResponse.data}
                            } else {
                                throw new Error(`Error occurred when fetching recipient's chat information\nHTTP Status: ${recipientChatResponse.status}`)
                            }
                        })
                })
                .then(({senderChatData, recipientChatData}) => {
                    return ChatApi.setMessagesToRead(recipientInfo.email)
                        .then(senderReadResponse => {
                            if (senderReadResponse.status === HttpStatus.OK) {
                                return {senderChatData, recipientChatData, senderReadData: senderReadResponse.data};
                            } else {
                                throw new Error(`Error occurred when updating the recipient's read messages\nHTTP Status: ${senderReadResponse.status}`)
                            }
                        })
                })
                .then(({senderChatData, recipientChatData, senderReadData}) => {
                    let combinedData = senderChatData.concat(recipientChatData);

                    let sortedChatInfo = combinedData.map(chat => ({
                        ...chat,
                        timeStamp: new Date(chat.timeStamp)
                    }));

                    sortedChatInfo.sort((a, b) => a.timeStamp - b.timeStamp);
                    setChatInfo(sortedChatInfo);
                    setUpdateUnread(senderReadData);
                })
                .catch(e => {
                    console.error(e);
                })
        }

        loadData();
    }, [])

    const registerUser = () => {
        const socket = new SockJS(`http://localhost:8080/ws?jwtToken=${ApiUtils.getAuthToken()}`)
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe(`/user/${senderInfo.email}/queue/messages`, onMessageReceived);
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

    const handleUserVideo = (e) => {
        setSenderVideo(e.target.files[0].name);
    }

    const handleSenderMessage = (e) => {
        setSenderMessage({
            "senderId": senderInfo.email,
            "recipientId": recipientInfo.email,
            "content": e.target.value,
            "timeStamp": new Date()
        });
    };

    const sendSenderMessage = () => {
        if (senderMessage.content !== "") {
            setChatInfo([...chatInfo, senderMessage]);
            stompClient.send("/app/processMessage", {}, JSON.stringify(senderMessage));
            //resets chat for next message
            setSenderMessage({
                ...senderMessage,
                "content": "",
                "timeStamp": ""
            });
            setSenderVideo("");
        }
    };

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
                    <MessageConstructor senderInfo={senderInfo} recipientInfo={recipientInfo} chatInfo={message}/>
                </li>);
            }

        }

        return (<ul>
                {chatList}
            </ul>
        );
    };

    if (!chatInfo)
        return null;

    if (!stompClient) {
        registerUser();
    }

    return (
        <dialog open className={`fixed inset-0 z-50 bg-black bg-opacity-50 h-screen w-screen ${className}`}>
            <div className="flex flex-col h-screen">
                <div id="chat-title" className="mx-2 mt-2 flex justify-center border border-gray-200 p-2 rounded-t-xl bg-gray-200 text-gray-900 font-semibold relative">
                    Chatting with {recipientInfo.fullName}
                    <button onClick={onCloseDialog} className="bg-red-500 absolute h-6 w-6 top-0 right-0 rounded-full m-2 p-0.5 hover:bg-custom-dark-red">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_429_11083)">
                                <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_429_11083">
                                    <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
                <div id="chat-message" className="mx-2 p-4 bg-white border-x border-gray-200 overflow-auto flex-grow">
                    <ChatList messages={chatInfo}/>
                </div>
                <div id="chat-controls" className="mx-2 mb-2 border border-gray-200 p-4 rounded-b-xl bg-gray-200">
                    <div className="border mb-4 p-2 w-full bg-white text-gray-900 rounded-xl break-words">
                        {senderVideo === "" ? "No files selected." : senderVideo}
                    </div>
                    <div className="flex w-full items-center">
                        <input id="chat-attach-file" type="file" id="file-input" className="hidden" onChange={handleUserVideo}/>
                        <label htmlFor="file-input" className="h-8 w-8 rounded-full bg-custom-red mr-2 hover:bg-custom-dark-red cursor-pointer">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-1.5">
                                <path d="M13.5 3H12H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H7.5M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V9.75V12V19C19 20.1046 18.1046 21 17 21H16.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 21L12 13M12 13L14.5 15.5M12 13L9.5 15.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </label>
                        <input id="chat-input-box" type="text" placeholder="Type your message..." className="flex-1 rounded-full px-4 py-2 border border-gray-200 focus:outline-none" value={senderMessage.content} onChange={handleSenderMessage}/>
                        <button id="chat-submit" className="h-8 w-8 rounded-full ml-2 bg-custom-red hover:bg-custom-dark-red" onClick={sendSenderMessage}>
                            <svg className="fill-current fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 7V17M12 7L16 11M12 7L8 11" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </dialog>);
}

export default function ChatAdmin() {
    const [senderInfo, setSenderInfo] = useState(null);
    const [recipientsInfo, setRecipientsInfo] = useState(null);
    const [chatCSS, setChatCSS] = useState("flex flex-col h-screen")
    const [selectedRecipient, setSelectedRecipient] = useState({
        email: "",
        fullName: "",
        userType: "",
        unread: -1
    });
    const [modalVisibility, setModalVisibility] = useState("hidden");
    const [senderMessage, setSenderMessage] = useState({
        "senderId": "",
        "recipientId": "",
        "content": "",
        "timeStamp": ""
    });
    const [senderVideo, setSenderVideo] = useState("");
    const [updateUnread, setUpdateUnread] = useState(0);

    useEffect(() => {
        const loadData = () => {
            UserApi.getProfileInformation()
                .then(senderResponse => {
                    if (senderResponse.status === HttpStatus.OK) {
                        setSenderInfo(senderResponse.data);
                        return ChatApi.getClients({})
                    } else {
                        throw new Error(`Error occurred when fetching user profile information\nHTTP Status: ${senderResponse.status}`);
                    }
                })
                .then(recipientsResponse => {
                    if (recipientsResponse.status === HttpStatus.OK) {
                        return recipientsResponse.data;
                    } else {
                        throw new Error(`Error occurred when fetching a list of recipients\nHTTP Status: ${recipientsResponse.status}`)
                    }
                })
                .then(recipientsData => {
                    let promises = recipientsData.map(recipientData => {
                        return ChatApi.getUnreadMessageForSender(recipientData.email)
                            .then(recipientUnreadResponse => {
                                if (recipientUnreadResponse.status === HttpStatus.OK) {
                                    recipientData.unread = recipientUnreadResponse.data.unreadMessage;
                                    return recipientData;
                                } else {
                                    throw new Error(`Error occurred when fetching unread message for ${recipientData.email}\nHTTP Status: ${recipientUnreadResponse.status}`)
                                }
                            })
                    })
                    return Promise.all(promises);
                })
                .then(recipientsData => {
                    recipientsData.sort((a, b) => b.unread - a.unread || a.fullName.localeCompare(b.fullName));
                    setRecipientsInfo(recipientsData);
                })
                .catch(e => {
                    console.error(e)
                })
        }

        loadData()
    }, []);

    if (!(senderInfo && recipientsInfo)) {
        return <div>Fetching APIs...</div>
    }

    if (chatCSS === "flex flex-col h-screen") {
        let navigationBar = document.getElementById("navigation-bar").getBoundingClientRect()

        if (!navigationBar) {
            return <div>Loading...</div>
        }

        setChatCSS(prevChatCSS => prevChatCSS.substring(0, prevChatCSS.length - "screen".length) + `[calc(100vh-${navigationBar.height}px)]`);
    }

    const ButtonConstructor = ({recipientInfo}) => {
        return (
            <>
                <div className="relative">
                    <button onClick={() => {
                        setSelectedRecipient(recipientInfo);
                        setModalVisibility("");
                    }
                    } className="w-full mt-2 text-sm font-semibold text-gray-900 p-2 border-gray-200 rounded-xl bg-gray-200">{recipientInfo.fullName}</button>
                    {recipientInfo.unread > 0 && (
                        <span className="absolute top-0 right-0">
                            <span className="relative inline-block rounded-full h-3 w-3 bg-lime-500">
                                <span className="absolute animate-ping inline-block h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                            </span>
                        </span>
                    )}
                </div>
            </>
        )
    }

    const ButtonList = ({recipientsInfo}) => {
        const buttonList = [];


        //TODO: sort based on number of messages -> highest message [if same use alphabetical] -> notification first and rest are sorted alphabetically
        //idea create two arrays then combine together at end once sorted :)
        for(let recipientInfo of recipientsInfo) {
            buttonList.push(<li key={recipientInfo.fullName}>
                <ButtonConstructor recipientInfo={recipientInfo}/>
            </li>)
        }

        return (
            <ul>
                {buttonList}
            </ul>
        )
    }


    return (
        <div className={chatCSS}>
            <div className="mx-2 mt-2 flex justify-center border border-gray-200 p-2 rounded-t-xl bg-custom-red text-white font-semibold">
                Clients
            </div>
            <div className="mx-2 px-4 bg-white border-x border-gray-200 overflow-auto flex-grow items-center">
                <ButtonList recipientsInfo={recipientsInfo}/>
            </div>
            <div className="mx-2 mb-2 flex justify-center border border-gray-200 p-2 rounded-b-xl bg-custom-red text-gray-900 font-semibold h-[42px]">
            </div>
            {modalVisibility === "" && (
                <ChatPopUp
                    senderInfo={senderInfo}
                    recipientInfo={selectedRecipient}
                    className={modalVisibility}
                    onCloseDialog={() => {
                        setModalVisibility("hidden");
                        setSelectedRecipient({
                            email: "",
                            fullName: "",
                            userType: "",
                            unread: -1
                        });
                        setSenderMessage({
                            "senderId": "",
                            "recipientId": "",
                            "content": "",
                            "timeStamp": ""
                        });
                        setSenderVideo("");
                        stompClient.disconnect();
                        stompClient = null;
                    }}
                    senderMessage={senderMessage}
                    setSenderMessage={setSenderMessage}
                    senderVideo={senderVideo}
                    setSenderVideo={setSenderVideo}
                    updateUnread={updateUnread}
                    setUpdateUnread={setUpdateUnread}>
                </ChatPopUp>
            )}
        </div>
    )
}