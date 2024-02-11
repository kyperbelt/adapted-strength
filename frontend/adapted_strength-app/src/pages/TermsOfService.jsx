// TermsOfService.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TermsOfService() {
    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();

    const handleAcceptanceChange = (event) => {
        setAccepted(event.target.checked);
    };

    const handleSubmit = () => {
        if (accepted) {
            navigate('/sign-up-additional');
        } else {
            alert("Please accept the terms of service to proceed.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Terms of Service</h1>
            <div className="mb-4">
                {/* Terms of Service content here */}
                <p>Welcome to Adapted Strength! Please read our Terms of Service carefully.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta voluptates facilis nulla vel dolores enim alias voluptatum iusto iure excepturi dicta sapiente quis recusandae quisquam omnis, labore ullam, incidunt nihil.</p>
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
            <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded text-white ${accepted ? 'bg-blue-500' : 'bg-gray-300'}`}
                disabled={!accepted}
            >
                Proceed
            </button>
        </div>
    );
}

export default TermsOfService;
