/*
Module: Booking.jsx - Consultations Page
Team: TeraBITE
*/
import { useEffect } from 'react';
import { PrimaryButton } from '../components/Button';

const CalendlyBooking = () => {
    useEffect(() => {
        document.title = "Book Consultation - Adapted Strength";
        
        // Load Calendly widget script
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.title = "Adapted Strength";
            // Clean up script if component unmounts
            const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    const openCalendlyPopup = () => {
        if (window.Calendly) {
            window.Calendly.initPopupWidget({
                url: 'https://calendly.com/adaptedstrength'
            });
        } else {
            // Fallback if Calendly hasn't loaded yet
            window.open('https://calendly.com/adaptedstrength', '_blank');
        }
    };

    return (
        <div className="min-h-screen pt-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Consultation</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                        Ready to start your fitness journey? Schedule a consultation with Coach Alex to discuss your goals, 
                        assess your current fitness level, and create a personalized training plan that works for you.
                    </p>
                    
                    {/* Benefits Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Assessment</h3>
                            <p className="text-gray-600 text-sm">
                                Comprehensive evaluation of your current fitness level, goals, and any limitations.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Plan</h3>
                            <p className="text-gray-600 text-sm">
                                Receive a tailored training program designed specifically for your goals and schedule.
                            </p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                            <p className="text-gray-600 text-sm">
                                Get answers to your questions and learn proper techniques from an experienced coach.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main CTA Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                        <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
                            Click the button below to open our scheduling system and choose a time that works best for you. 
                            All consultations are conducted personally by Coach Alex.
                        </p>
                        
                        <PrimaryButton
                            onClick={openCalendlyPopup}
                            className="bg-white text-red-600 hover:bg-gray-50 text-lg px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Schedule Your Consultation
                        </PrimaryButton>
                        
                        <p className="text-red-100 text-sm mt-4">
                            Free consultation • No commitment required • 30-45 minutes
                        </p>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">What to Expect</h3>
                        <ul className="space-y-2 text-blue-800 text-sm">
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                30-45 minute consultation session
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Discussion of your fitness goals and experience
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Assessment of current fitness level
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Overview of available training programs
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Q&A session for any questions you have
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-900 mb-3">Preparation Tips</h3>
                        <ul className="space-y-2 text-green-800 text-sm">
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Think about your specific fitness goals
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Note any injuries or physical limitations
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Consider your available training schedule
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Prepare questions about training methods
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Be ready to discuss your fitness history
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Alternative Access */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-sm mb-4">
                        Having trouble with the popup? You can also schedule directly:
                    </p>
                    <a 
                        href="https://calendly.com/adaptedstrength" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        Open Calendly in a new tab
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CalendlyBooking;
