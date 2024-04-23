import {useCallback, useEffect, useState} from "react";
import ReactPlayer from "react-player";
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs'
import {UserApi} from "../api/UserApi";
import {ChatApi} from "../api/ChatApi";
import {HttpStatus} from "../api/ApiUtils";
import {on} from "ws";


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

async function onMessageReceived(payload){
    console.log('Message received', payload);
}

function GetChat({senderId, receiverId})
{
    const [data, setData] = useState(null);
    const fetchApi = () => {
        ChatApi.getChat(receiverId, senderId)
            .then(response => {
                if(response.status == HttpStatus.OK)
                {
                    setData(response.data);
                    console.log(`Message here: ${JSON.stringify(response)}`);
                }
                throw new Error(`${response}`);
            })
            .catch((e) => {
                console.log(e);
            })
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <div>
            <div>data: {JSON.stringify(data)}</div>
            <div>
                <button onClick={fetchApi}>manual fetch</button>
            </div>
        </div>
    )
}


export default function Chat()
{
    const [message, setMessage] = useState("");
    const [videoFilePath, setVideoFilePath] = useState("");
    const [videoName, setVideoName] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [userData, setUserData] = useState(null);
    let stompClient = null;

    useEffect(() => {
        UserApi.getProfileInformation()
            .then(response => {
                setUserData(response.data);
                console.log(`Inside Effect: ${userData}`);
            })
            .catch(e => {
                console.log(e);
            })
    }, [])

    useEffect(() => {
        if(userData !== null)
        {
            ChatApi.getChat("two@email.com", userData.email).then(function (response) {
                setMessageList(response.data)
            })
        }
    }, [])

    const test = () => {
        registerUser();
        onConnected();
    }

    // const addToList = () => {
    //     let tempList = list;
    //
    //     // if(videoFilePath != "")
    //     // {
    //     //     tempList.push(<ReactPlayer url={videoFilePath} controls={true} width="100%" height="100%"/>)
    //     // }
    //
    //     if(msg != "")
    //     {
    //         tempList.push(msg);
    //     }
    //
    //     setList(tempList);
    //     setMsg("");
    //     // setVideoFilePath("");
    // }

    const handleMessage = event => {
        setMessage(event.target.value)
    }

    const handleVideoUpload = event => {
        setVideoFilePath(URL.createObjectURL(event.target.files[0]))
        setVideoName(event.target.files[0].name)
    }

    const registerUser = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(Sock);
        console.log(`Is error here!? ${stompClient}`);
        stompClient.connect({}, onConnected, onError);
    }

    const onError = (error) => {
        console.log(`What is the error!!! ${error}`);
    }

    const onConnected = () => {
        stompClient.subscribe(`/user/${userData.email}/queue/messages`, onMessageReceived);
        stompClient.send("/app/chatUser.addUser",{}, JSON.stringify({email: userData.email, fullName: `${userData.firstName} ${userData.lastName}`}));

        console.log(`Stomp Client: ${stompClient}`);
    }

    const sendMessage = () => {
        console.log(`What is going on!? ${stompClient}`);
        if (stompClient)
        {
            const chatMessage = {
                senderId: userData.email,
                recipientId: "admin@email.com",
                content: message,
                timeStamp: new Date(),
            };



            setMessage("");
        }
    }


    return (
        <div className="bg-white m-2 rounded-lg p-2">
            <div className="font-semibold bg-custom-gray p-2">
                Chatting with Alex
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col space-y-2" id="a">
                    <ul>
                        {
                            messageList.length > 0 && messageList.map((data) => data.senderId == userData.email ?
                                <RightMessage>{data.content}</RightMessage> : <LeftMessage>{data.content}</LeftMessage>)
                        }
                    </ul>

                </div>
            </div>
            {/*<div>{videoName}</div>*/}
            {
                userData !== null && <GetChat senderId={userData.email} receiverId={"two@email.com"}/>
            }
            <button onClick={test}>Connect Work Please :(</button>
            <div className="bg-custom-gray p-4 flex items-center">
                <input type="file" id="file-input" className="hidden" onChange={handleVideoUpload}/>
                <label htmlFor="file-input"
                       className="w-7 h-7 rounded-full bg-custom-red flex justify-center mr-2">+</label>
                <input type="text" placeholder="Type your message..."
                       className="flex-1 border rounded-full px-4 py-2 focus:outline-none" onChange={handleMessage}
                       value={message}/>
                <button className="rounded-full bg-custom-red block p-2 ml-2 hover:bg-custom-dark-red"
                        onClick={sendMessage}>Send
                </button>
            </div>
        </div>
    );
}