/*
Module: Layout.jsx
Team: TeraBITE
*/
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navBar";

function ChatButton({...props})
{
    const messageNotification = props.messageNotification;
    return (
        <div className="fixed bottom-10 right-10">
            <Link to="chat" className="border-4 border-black bg-blue-400 rounded-lg p-2 hover:bg-blue-300">Chat</Link>
            {messageNotification && <span className="relative flex h-4 w-4 bottom-10 left-11">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
            </span>}
        </div>
    );
}

export default function Layout() {
    return (
        <div className="w-full h-full flex flex-col my-0">
            <NavBar />
            <Outlet className="" />
            <ChatButton messageNotification={false}/>
        </div>
    );
}
