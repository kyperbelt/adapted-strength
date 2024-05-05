import {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs'
import {UserApi} from "../api/UserApi";
import {ChatApi} from "../api/ChatApi";
import {ApiUtils} from "../api/ApiUtils";


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

function IsSubscribed(subscription)
{
    return subscription > 0;
}

function onError(){
    console.log("error");
}

async function onMessageReceived(payload){
    console.log('Message received', payload);

}

export default function Chat()
{
    const [message, setMessage] = useState("");
    const [videoFilePath, setVideoFilePath] = useState("");
    const [videoName, setVideoName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [messageList, setMessageList] = useState([]);
    let subscription = IsSubscribed(1);
    let stompClient = null;

    const change = event => {
        setMessage(event.target.value)
    }

    useEffect(() => {
        if(fullName == "" || email == "")
        {
            UserApi.getProfileInformation().then(function (response) {
                setFullName(response.data.firstName + " " + response.data.lastName)
                setEmail(response.data.email)
                console.log("touched!")
            })
        }
    })

    useEffect(() => {
        ChatApi.getChat({senderId: "two@email.com", receiverId: email}).then(function (response) {
            setMessageList(response.data)
        })
    })

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

    const handleVideoUpload = event => {
        setVideoFilePath(URL.createObjectURL(event.target.files[0]))
        setVideoName(event.target.files[0].name)
    }

    const registerUser = () => {
        let Sock = new SockJS(`http://localhost:8080/ws?jwtToken=${ApiUtils.getAuthToken()}`);
        stompClient = Stomp.over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        UserApi.getProfileInformation().then(function (response) {
            let email2 = response.data.email
            let fullName2 = response.data.firstName + " " + response.data.lastName

            stompClient.subscribe(`/user/${email}/queue/messages`, onMessageReceived);
            stompClient.send("/app/chatUser.addUser",{}, JSON.stringify({email: email2, fullName: fullName2}));
        })
    }

    const sendMessage = () => {
        registerUser()
        if(stompClient)
        {

            UserApi.getProfileInformation().then(function (response) {
                let email2 = response.data.email

                const chatMessage = {
                    senderId: email,
                    recipientId: "two@email.com",
                    content: message,
                    timeStamp: new Date(),
                };

                stompClient.send("/app/processMessage", {}, JSON.stringify(chatMessage));
                setMessage("");
            })

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
                            messageList.length > 0 && messageList.map((data) => data.senderId == email ? <RightMessage>{data.content}</RightMessage> : <LeftMessage>{data.content}</LeftMessage>)
                        }
                    </ul>
                </div>
            </div>
            <div>{videoName}</div>
            <div className="bg-custom-gray p-4 flex items-center">
                {
                    (subscription)
                        ? <>

                            <input type="file" id="file-input" className="hidden" onChange={handleVideoUpload}/>
                            <label htmlFor="file-input" className="w-7 h-7 rounded-full bg-custom-red flex justify-center mr-2">+</label>
                            <input type="text" placeholder="Type your message..." className="flex-1 border rounded-full px-4 py-2 focus:outline-none" onChange={change} value={message}/>
                            <button className="rounded-full bg-custom-red block p-2 ml-2 hover:bg-custom-dark-red" onClick={sendMessage}>Send</button></>
                        : <><input type="file" id="file-input" className="hidden" disabled/>
                            {/*onChange={handleVideoUpload}*/}
                            <label htmlFor="file-input" className="w-7 h-7 rounded-full bg-custom-red flex justify-center mr-2 opacity-50 cursor-not-allowed">+</label>
                            <input type="text" placeholder="Subscribed to access this feature" className="flex-1 border rounded-full px-4 py-2 focus:outline-none" onChange={change} value={message} disabled/>
                            <button className="rounded-full bg-custom-red block p-2 ml-2 cursor-not-allowed opacity-50 " disabled>Send</button></>
                }
            </div>
        </div>
    );
}
