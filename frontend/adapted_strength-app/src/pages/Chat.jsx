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

export default function Chat() {
    return (
        <div className="bg-white m-2 rounded-lg p-2">
            <div className="font-semibold bg-custom-gray p-2">
                Chatting with Alex
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col space-y-2">
                    <RightMessage>
                        Sender
                    </RightMessage>
                    <LeftMessage>
                        Receiver
                    </LeftMessage>
                    <RightMessage>
                        Sender
                    </RightMessage>
                    <LeftMessage>
                        Receiver
                    </LeftMessage>
                    <RightMessage>
                        Sender
                    </RightMessage>
                    <LeftMessage>
                        Receiver
                    </LeftMessage>
                    <RightMessage>
                        Sender
                    </RightMessage>
                    <LeftMessage>
                        Receiver
                    </LeftMessage>
                </div>
            </div>
            <div className="bg-custom-gray p-4 flex items-center">
                <input type="text" placeholder="Type your message..." className="flex-1 border rounded-full px-4 py-2 focus:outline-none"/>
                <button className="rounded-full bg-custom-red block p-2 ml-2 hover:bg-custom-dark-red">Send</button>
            </div>
        </div>
    );
}