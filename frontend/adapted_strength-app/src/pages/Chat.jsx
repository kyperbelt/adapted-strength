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

function Subscribed()
{
    return (
        <>
            <input type="text" placeholder="Type your message..." className="flex-1 border rounded-full px-4 py-2 focus:outline-none"/>
            <button className="rounded-full bg-custom-red block p-2 ml-2 hover:bg-custom-dark-red">Send</button>
        </>
    );
}

function NotSubscribed()
{
    return (
        <>
            <input type="text" placeholder="Subscribed to access this feature" className="flex-1 border rounded-full px-4 py-2 focus:outline-none" disabled/>
            <button className="rounded-full bg-custom-red block p-2 ml-2 cursor-not-allowed opacity-50" disabled>Send</button>
        </>
    );
}

function ChatBox({...props})
{
    const isSubscribed = props.isSubscribed;

    if(isSubscribed)
    {
        return <Subscribed/>;
    }
    return <NotSubscribed/>;
}

export default function Chat() {
    return (
        <div className="bg-white m-2 rounded-lg p-2">
            <div className="font-semibold bg-custom-gray p-2">
                Chatting with Alex
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col space-y-2">
                    <RightMessage>
                        Sender: msg 1
                    </RightMessage>
                    <LeftMessage>
                        Receiver: msg 2
                    </LeftMessage>
                    <RightMessage>
                        Sender: msg 3
                    </RightMessage>
                    <LeftMessage>
                        Receiver: msg 4
                    </LeftMessage>
                    <RightMessage>
                        Sender: msg 5
                    </RightMessage>
                    <LeftMessage>
                        Receiver: msg 6
                    </LeftMessage>
                    <RightMessage>
                        Sender: msg 7
                    </RightMessage>
                    <LeftMessage>
                        Receiver: msg 8
                    </LeftMessage>
                </div>
            </div>
            <div className="bg-custom-gray p-4 flex items-center">
                <ChatBox isSubscribed={false}/>
            </div>
        </div>
    );
}