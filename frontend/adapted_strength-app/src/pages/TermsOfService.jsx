// TermsOfService.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PrimaryButton } from '../components/Button';
import { WebAdminApi } from '../api/WebAdminApi';

const showdown = window.showdown;

function TermsOfService() {
    const converter = new showdown.Converter();
    const [termsOfService, setTermsOfService] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    useEffect(() => {
        if (!state || !state.email || !state.password) {
            // TODO: for now we just redirect to signup page, but later 
            //        we want to check if the state is in storage or not
            navigate('/sign-up', {});
        }

        WebAdminApi.getContent({ resource: 'terms-of-service' }).then((data) => {
            setTermsOfService(data);
            console.log(data);
        }).catch((error) => {
            console.error('Error getting terms of service:', error);
            setTermsOfService({ content: 'Error getting terms of service' });
        });
    }, []);

    console.log(location);


    const handleAcceptanceChange = (event) => {
        setAccepted(event.target.checked);
    };

    const handleSubmit = () => {
        if (accepted) {
            navigate('/health-questionnaire', { state: { email: state.email, password: state.password, tosAccepted: true } });
        } else {
            alert("Please accept the terms of service to proceed.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Terms of Service</h1>
            <div className="mb-4">
                {/* Terms of Service content here */}
                {termsOfService && <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(termsOfService.content) }} />}
                {/* ... */}
            </div>
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={accepted}
                    onChange={handleAcceptanceChange}
                    className="mr-2"
                />
                <label htmlFor="acceptTerms" className="text-sm">I accept the Terms of Service</label>
            </div>
            <PrimaryButton
                onClick={handleSubmit}
                className={`px-4 py-2 rounded text-white ${accepted ? 'bg-accent' : 'bg-gray-300'}`}
                disabled={!accepted}
            >
                Proceed
            </PrimaryButton>
        </div>
    );
}

export default TermsOfService;
