import React from 'react';

const ContactForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Form submitted. This is a placeholder functionality.');
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-custom-gray rounded-lg shadow-xl">
            <div className="mb-6">
                <label htmlFor="name" className="block text-custom-dark text-sm font-bold mb-2">Name:</label>
                <input type="text" id="name" name="name" className="bg-custom-gray w-full p-3 rounded-lg border border-gray-300 focus:border-custom-red focus:outline-none focus:ring-2 focus:ring-custom-red shadow-sm transition duration-200 ease-in-out" />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-custom-dark text-sm font-bold mb-2">Email:</label>
                <input type="email" id="email" name="email" className="bg-custom-gray w-full p-3 rounded-lg border border-gray-300 focus:border-custom-red focus:outline-none focus:ring-2 focus:ring-custom-red shadow-sm transition duration-200 ease-in-out" />
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block text-custom-dark text-sm font-bold mb-2">Message:</label>
                <textarea id="message" name="message" rows="4" className="bg-custom-gray w-full p-3 rounded-lg border border-gray-300 focus:border-custom-red focus:outline-none focus:ring-2 focus:ring-custom-red shadow-sm transition duration-200 ease-in-out"></textarea>
            </div>
            <button type="submit" className="bg-custom-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">Send</button>
        </form>
    );
};

export default ContactForm;
