import {useState} from "react";
import ReactPlayer from "react-player";

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

export default function Chat()
{
    const [msg, setMsg] = useState("");
    const [list, setList] = useState([]);
    const [videoFilePath, setVideoFilePath] = useState("");
    let subscription = IsSubscribed(1);

    const change = event => {
        setMsg(event.target.value)
    }

    const addToList = () => {
        let tempList = list;

        if(videoFilePath != "")
        {
            tempList.push(<ReactPlayer url={videoFilePath} controls={true} width="100%" height="100%"/>)
        }

        if(msg != "")
        {
            tempList.push(msg);
        }

        setList(tempList);
        setMsg("");
        setVideoFilePath("");
    }

    const handleVideoUpload = event => {
        setVideoFilePath(URL.createObjectURL(event.target.files[0]))
    }

    return (
        <div className="bg-white m-2 rounded-lg p-2">
            <div className="font-semibold bg-custom-gray p-2">
                Chatting with Alex
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col space-y-2" id="a">
                    <RightMessage>
                        Sender
                    </RightMessage>
                    <LeftMessage>
                        Receiver
                    </LeftMessage>
                    <ul>{list.length > 0 && list.map((item) => <RightMessage>{item}</RightMessage>)}</ul>
                </div>
            </div>
            <div className="bg-custom-gray p-4 flex items-center">
                {
                    (subscription)
                        ? <><input type="file" id="file-input" className="hidden" onChange={handleVideoUpload}/>
                            <label htmlFor="file-input" className="w-7 h-7 rounded-full bg-custom-red flex justify-center mr-2">+</label>
                            <input type="text" placeholder="Type your message..." className="flex-1 border rounded-full px-4 py-2 focus:outline-none" onChange={change} value={msg}/>
                            <button className="rounded-full bg-custom-red block p-2 ml-2 hover:bg-custom-dark-red" onClick={addToList}>Send</button></>
                        : <><input type="file" id="file-input" className="hidden" onChange={handleVideoUpload} disabled/>
                            <label htmlFor="file-input" className="w-7 h-7 rounded-full bg-custom-red flex justify-center mr-2 opacity-50 cursor-not-allowed">+</label>
                            <input type="text" placeholder="Subscribed to access this feature" className="flex-1 border rounded-full px-4 py-2 focus:outline-none" onChange={change} value={msg} disabled/>
                            <button className="rounded-full bg-custom-red block p-2 ml-2 cursor-not-allowed opacity-50 " onClick={addToList} disabled>Send</button></>
                }
            </div>
        </div>
    );
}

//