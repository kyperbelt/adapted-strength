import { BasicTextArea } from "../../components/TextArea";
import { PrimaryButton } from "../../components/Button";
import { WebAdminApi } from "../../api/WebAdminApi";

import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const showdown = window.showdown;

export default function WebAdmin() {
    const [content, setContent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        WebAdminApi.getContentFull().then((data) => {
            setContent(data);
            console.log(data);
        }).catch((error) => {
            console.error('Error getting content:', error);
            navigate('/login', {});
        }
        );
    }, []);

    if (!content) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <h1 className="text-3xl font-bold">WebAdmin</h1>
            <TermOfServiceSection content={content} />
        </div>
    );
}


function TermOfServiceSection({ content }) {
    const [termsOfService, setTermsOfService] = useState(content.termsOfService);

    var converter = new showdown.Converter();

    const onSaveTermsOfService = async () => {
        delete termsOfService.id;
        termsOfService.content = document.getElementById('termsOfService').value;
        try {
            const response = await WebAdminApi.createTermsOfService(termsOfService);
            console.log(response);
        } catch (error) {
            console.error('Error creating terms of service:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-0">
            <BasicTextArea
                id="termsOfService"
                label="Terms of Service"
                value={termsOfService.content}
                placeholder=""
                rows={4}
                cols={50}
            />
            <div className="flex justify-end">
                <PrimaryButton text="Save" onClick={onSaveTermsOfService} >Save</PrimaryButton>
            </div>

            <div className="prose px-6">
                <span id="termsOfServicePreview" dangerouslySetInnerHTML={{ __html: converter.makeHtml(termsOfService.content) }}></span>
            </div>
        </div>
    );
}
