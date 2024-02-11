// HealthQuestionnaire.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HealthQuestionnaire() {
    const [formData, setFormData] = useState({
        age: '',
        weight: '',
        height: '',
        fitnessGoals: '',
        healthConcerns: '',
        exerciseFrequency: '',

    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();



        console.log(formData);
        navigate('/next-page'); // Replace with the actual path
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Health Questionnaire</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md">
                <div>
                    <label htmlFor="age" className="block text-lg font-medium text-gray-700">Age</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="weight" className="block text-lg font-medium text-gray-700">Weight (kg)</label>
                    <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="height" className="block text-lg font-medium text-gray-700">Height (cm)</label>
                    <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="fitnessGoals" className="block text-lg font-medium text-gray-700">Fitness Goals</label>
                    <textarea id="fitnessGoals" name="fitnessGoals" value={formData.fitnessGoals} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="healthConcerns" className="block text-lg font-medium text-gray-700">Health Concerns</label>
                    <textarea id="healthConcerns" name="healthConcerns" value={formData.healthConcerns} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="exerciseFrequency" className="block text-lg font-medium text-gray-700">Exercise Frequency</label>
                    <select id="exerciseFrequency" name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
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
