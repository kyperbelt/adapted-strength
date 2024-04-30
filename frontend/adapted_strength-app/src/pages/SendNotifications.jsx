import React, { useEffect, useState } from "react";
import { ApiUtils } from "../api/ApiUtils";
import LabeledInputField from "../components/forms/LabeledInputField";

const SendNotifications = () => {
    const [inputs, setInputs] = useState({});
    const [tokens, setTokens] = useState({});

    useEffect(() => {
        async function fetchTokens() {
            try {
                await fetch(ApiUtils.getApiUrl('notifications/get_tokens'), {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${ApiUtils.getAuthToken()}`,
                    },
                }).then((response) => response.json())
                    .then((result) => {
                        // console.log(result);
                        result = result.map(r => r.token)
                        setTokens(result);
                        // return result;
                    })

            } catch (error) {
                console.error(error)
            };
        }
        fetchTokens();
    }, []);

    var options = []
    for (let i = 0; i < tokens?.length; i++) {
        options.push(<option value={tokens[i]}>{tokens[i].substring(tokens[i].length - 10)}</option>)
    }

    const handleChange = (event) => {
        var options = event.target.options;
        var values = [];
        for (var i = 0, l = options?.length; i < l; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }

        const name = event.target.name;
        var value = event.target.value;

        if (name == 'selectedTokens') {
            value = values;
        }
        // console.log(name)
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(inputs);

        var title = document.getElementById('title').value;
        var type = inputs['selectedType'];
        var tokens = inputs['selectedTokens'];
        var content = document.getElementById('content').value;
        // console.log(title);
        // console.log(type);
        // console.log(tokens);
        // console.log(content);

        for(let i=0;i<tokens?.length;i++)
        {
            ApiUtils.apiPost('notifications/send', {title: title, type: type, body: content, token: tokens[i]})
            .then((res) => {
                if(res?.status == 200)
                {
                    alert(type + " has been sent to " + tokens[i].substring(tokens[i].length-10));
                }
            });
        }
    }

    function InputField() {
        return <LabeledInputField type="text" id="title" name="title" required={true} placeholder="Enter title" />
    }

    function ConttentInputField() {
        return <LabeledInputField type="text" id="content" name="content" required={true} placeholder="Enter the content" />
    }

    function SubmitButton() {
        return (<button type="submit" className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 "  >
            Submit
        </button>);
    }

    return (


        <div className="Tabs">
            <p className="heading">Send Notifications/Announcements</p>
            <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col items-center ">
                    <label htmlFor="token_selector">Select Token/Tokens</label>
                    <select
                        className="px-0 block px-2.5 pb-2.5 pt-4  text-sm text-gray-900 bg-primary rounded-lg border-2 border-primary-dark appearance-none focus:outline-none focus:ring-0 focus:border-secondary-light peer"
                        name="selectedTokens"
                        value={inputs.tokens}
                        multiple={true}
                        onChange={handleChange}
                    >
                        {options?.length == 0 ? [<option disabled={true}>No token found in database</option>] : options}
                    </select>
                </div>
                <br />
                <div className="w-full flex flex-col items-center ">
                    <label htmlFor="type">Select Type</label>
                    <select className="px-0 block px-2.5 pb-2.5 pt-4  text-sm text-gray-900 bg-primary rounded-lg border-2 border-primary-dark appearance-none focus:outline-none focus:ring-0 focus:border-secondary-light peer"
                        name="selectedType"
                        onChange={handleChange}
                        id="type"
                    >
                        <option value={"notification"}>Notification</option>
                        <option value={"announcement"}>Announcement</option>
                    </select>
                </div>
                <br />
                <div className="w-full flex flex-col items-center px-0 ">
                    <InputField />
                </div>
                <br></br>
                <div className="w-full flex flex-col items-center px-0 ">
                    <ConttentInputField />
                </div>
                <div className="flex justify-center w-full relative top-5">
                    <SubmitButton />
                </div>
            </form>
        </div>
    );
};

export default SendNotifications;