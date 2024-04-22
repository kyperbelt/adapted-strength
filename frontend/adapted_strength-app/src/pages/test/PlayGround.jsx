import {useState, useEffect} from "react";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {UserApi} from "../../api/UserApi";
import {ChatApi} from "../../api/ChatApi";

// Solution: Add a reference to a coach from the <user_table_name> to another user that is a coach
const COACH = {
    "firstName": "Alex",
    "lastName": "Palting",
    "email": "admin-alex@email.com"
};

function RightMessage({...props})
{
    return (
        <div className="flex justify-end">
            <div className="bg-custom-red rounded-lg p-2 max-w-xs">
                {props.children}
            </div>
        </div>
    );
}

function LeftMessage({...props})
{
    return (
        <div className="flex">
            <div className="bg-gray-500 rounded-lg p-2 max-w-xs">
                {props.children}
            </div>
        </div>
    )
}

// Why does it work outside the default function but not inside :/
let stompClient = null;

export default function PlayGround()
{
    const [userInfo, setUserInfo] = useState({
            "status": null,
            "data": null,
            "fetched": false
    });
    const [chatInfo, setChatInfo] = useState({
        "status": null,
        "data": null,
        "fetched": false
    });
    const [userMessage, setUserMessage] = useState({
        "senderId": "",
        "recipientId": "",
        "content": "",
        "timeStamp": ""
    });
    const [sent, setSent] = useState(0);

    // Fetches the endpoint that grabs the user-information and stores it in an object
    useEffect(() => {
        UserApi.getProfileInformation()
            .then(response => {
                setUserInfo({
                    "status": response.status,
                    "data": response.data,
                    "fetched": true
                });
            })
    }, []);

    // Establishes the stomp condition if the userInfo is loaded
    useEffect(() => {
        if(userInfo.fetched)
        {
            registerUser();
        }
    }, [userInfo.fetched]);

    // Fetches the endpoint that grabs the chat-information and stores it in the object
    useEffect(() => {
        if(userInfo.fetched)
        {
            ChatApi.getChat(COACH.email, userInfo.data.email)
                .then(response => {
                    setChatInfo({
                        "status": response.status,
                        "data": response.data,
                        "fetched": true
                    });
                })
        }
    }, [userInfo.fetched]);

    const registerUser = () => {
        const socket = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        stompClient.subscribe(`/user/${userInfo.data.email}/queue/messages`);
        stompClient.send("/app/chatUser.addUser",{}, JSON.stringify({email: userInfo.data.email, fullName: `${userInfo.data.firstName} ${userInfo.data.lastName}`}));
    };

    const onError = e => {
        console.log(e);
    };

    const ChatList = () => {
        const list = chatInfo.data.map(message =>
            message.senderId === userInfo.data.email ? <RightMessage>{message.content}</RightMessage> : <LeftMessage>{message.content}</LeftMessage>
        );

        return (<ul>
                {list}
            </ul>
        );
    };

    const handleUserMessage = (e) => {
        if(userMessage.senderId === "" || userMessage.recipientId === "")
        {
            setUserMessage({
                "senderId": userInfo.data.email,
                "recipientId": COACH.email,
                "content": e.target.value,
                "timeStamp": new Date()
            });
        }
        else
        {
            setUserMessage({
                ...userMessage,
                "content": e.target.value,
                "timeStamp": new Date()
            });
        }
    };

    const sendUserMessage = () => {
        stompClient.send("/app/processMessage", {}, JSON.stringify(userMessage));
        setUserMessage({
            ...userMessage,
            "content": "",
            "timeStamp": ""
        });
    };


    return (<div className="bg-white m-2 rounded-lg p-2">
            <div className="font-semibold bg-custom-gray p-2">Chatting with {`${COACH.firstName} ${COACH.lastName}`}</div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col space-y-2" id="a">
                    {userInfo.fetched && chatInfo.fetched ?  <ChatList/> : "Loading..."}
                </div>
            </div>
            <div className="bg-custom-gray p-4 flex items-center">
                <input type="file" id="file-input" className="hidden"/>
                <label htmlFor="file-input" className="w-7 h-7 rounded-full bg-custom-red flex justify-center mr-2">+</label>
                <input type="text" placeholder="Type your message..." className="flex-1 border rounded-full px-4 py-2 focus:outline-none" value={userMessage.content} onChange={handleUserMessage}/>
                <button className="rounded-full bg-custom-red block p-2 ml-2 hover:bg-custom-dark-red" onClick={sendUserMessage}>Send</button>
            </div>
        </div>
    );
}

{

}
{/*{*/}
{/*    messageList.length > 0 && messageList.map((data) => data.senderId == userData.email ?*/}
{/*        <RightMessage>{data.content}</RightMessage> : <LeftMessage>{data.content}</LeftMessage>)*/}
{/*}*/}