// HealthQuestionnaire.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function HealthQuestionnaire() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    useEffect(() => {
        if (!state || !state.email || !state.password || !state.tosAccepted) {
            // TODO: for now we just redirect to signup page, but later
            //       we want to check if the state is in storage or not
            //       and redirect to the appropriate page
            navigate('/sign-up', {});
        }
    }, []);

    const handleChange = (e) => {
        // TODO: This is a good place to save data to user storage so we can come back and continue 
        // where we left off if the user navigates away from the page
    };

    // TODO: ADAPTEDS-125 Add a method for alex to be able to edit the health questionare serverside 
    //      and it will update on the client and on the server.
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        console.log(formData);

        const data = {
            age: formData.get('age'),
            weight: formData.get('weight'),
            height: formData.get('height'),
            fitnessGoals: formData.get('fitnessGoals'),
            healthConcerns: formData.get('healthConcerns'),
            exerciseFrequency: formData.get('exerciseFrequency'),
        };

        console.log(data);
        state.healthQuestionnaire = data;
        navigate('/sign-up-additional', { state });



        // console.log(formData);
        // navigate('/next-page'); // Replace with the actual path
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Health Questionnaire</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md">
                <div>
                    <label htmlFor="age" className="block text-lg font-medium text-gray-700">Age</label>
                    <input type="number" id="age" name="age" onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="weight" className="block text-lg font-medium text-gray-700">Weight (kg)</label>
                    <input type="number" id="weight" name="weight" onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="height" className="block text-lg font-medium text-gray-700">Height (cm)</label>
                    <input type="number" id="height" name="height" onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="fitnessGoals" className="block text-lg font-medium text-gray-700">Fitness Goals</label>
                    <textarea id="fitnessGoals" name="fitnessGoals" onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="healthConcerns" className="block text-lg font-medium text-gray-700">Health Concerns</label>
                    <textarea id="healthConcerns" name="healthConcerns" onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="exerciseFrequency" className="block text-lg font-medium text-gray-700">Exercise Frequency</label>
                    <select id="exerciseFrequency" name="exerciseFrequency" onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select one...</option>
                        <option value="none">None</option>
                        <option value="1-2 times a week">1-2 times a week</option>
                        <option value="3-4 times a week">3-4 times a week</option>
                        <option value="5+ times a week">5+ times a week</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md font-medium hover:bg-blue-600">Submit Questionnaire</button>
            </form>
        </div>
    );
}

export default HealthQuestionnaire;
