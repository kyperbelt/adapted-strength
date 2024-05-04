import {useEffect, useState} from "react";
import {UserApi} from "../api/UserApi";
import {HttpStatus} from "../api/ApiUtils";
import {ChatApi} from "../api/ChatApi";


function ButtonConstructor({recipientInfo}) {
    if (recipientInfo.unread > 0) {
        return (
            <>
                <div className="relative">
                    <button className="w-full mt-2 text-sm font-semibold text-gray-900 p-2 border-gray-200 rounded-xl bg-gray-200">{recipientInfo.fullName}</button>
                    <span className="absolute top-0 right-0">
                        <span className="relative inline-block rounded-full h-3 w-3 bg-lime-500">
                            <span className="absolute animate-ping inline-block h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                        </span>
                    </span>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="relative">
                <button className="w-full mt-2 text-sm font-semibold text-gray-900 p-2 border-gray-200 rounded-xl bg-gray-200">{recipientInfo.fullName}</button>
            </div>
        </>
    )
}

export default function ChatAdmin() {
    const [senderInfo, setSenderInfo] = useState(null);
    const [recipientsInfo, setRecipientsInfo] = useState(null);
    const [chatCSS, setChatCSS] = useState("flex flex-col h-screen")

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
                                    recipientData.unread = recipientUnreadResponse.data;
                                    return recipientData;
                                } else {
                                    throw new Error(`Error occurred when fetching unread message for ${recipientData.email}\nHTTP Status: ${recipientUnreadResponse.status}`)
                                }
                            })
                    })
                    return Promise.all(promises);
                })
                .then(recipientsData => {
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

    const ButtonList = ({recipientsInfo}) => {
        const buttonList = [];

        for(let recipientInfo of recipientsInfo) {
            buttonList.push(<ButtonConstructor recipientInfo={recipientInfo}/>)
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
        </div>
    )
}