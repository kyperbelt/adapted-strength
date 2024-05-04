import {useEffect, useState} from "react";
import {UserApi} from "../api/UserApi";
import {HttpStatus} from "../api/ApiUtils";
import {ChatApi} from "../api/ChatApi";


export default function AdminChat() {
    const [senderInfo, setSenderInfo] = useState(null);
    const [recipientsInfo, setRecipientInfo] = useState(null);



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
                        setRecipientInfo(recipientsResponse.data)

                    } else {
                        throw new Error(`Error occurred when fetching a list of recipients\nHTTP Status: ${recipientsResponse.status}`)
                    }
                })
        }

        loadData()
    }, []);

    if (!(senderInfo)) {
        return <div>Loading...</div>
    }


    return (
        <div>Hello World!</div>
    )
}