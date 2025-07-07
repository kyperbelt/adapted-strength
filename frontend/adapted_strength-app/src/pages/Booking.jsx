/*
Module: Booking.jsx - Consultations Page
Team: TeraBITE
*/
import { useEffect } from 'react';

const CalendlyBooking = () => {
    useEffect(() => {
        document.title = "Book Consultation - Adapted Strength";
        return () => {
            document.title = "Adapted Strength";
        };
    }, []);

    return (
        <div className="min-h-screen pt-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Consultation</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        Ready to start your fitness journey? Schedule a consultation with Coach Alex to discuss your goals, 
                        assess your current fitness level, and create a personalized training plan that works for you.
                    </p>
                </div>

                {/* Calendly Embed Section */}
                <div className="mb-8">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Your Preferred Time</h2>
                        <p className="text-gray-600">
                            Choose from the available consultation options below. All sessions are conducted personally by Coach Alex.
                        </p>
                    </div>
                    
                    {/* Calendly Container */}
                    <div className="bg-white">
                        <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
                        <iframe
                            src="https://calendly.com/adaptedstrength"
                            width="100%"
                            height="700"
                            title="Schedule consultation with Adapted Strength"
                            className="border-0"
                            frameBorder="0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendlyBooking;
