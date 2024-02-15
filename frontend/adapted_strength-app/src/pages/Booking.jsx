/*
Module: Booking.jsx
Team: TeraBITE
*/
/*
Module: ProgramUpload.jsx
Team: TeraBITE
*/
import React from 'react';
import logo from '../assets/logo.png';

function AdaptedStrengthLogo() {
    return (<div className="h-full flex flex-col items-center mt-12">
        <img src={logo} alt="Adapted Strength Logo" className="text-slate-200 px-3 py-1" />
    </div>);
}

const CalendlyBooking = () => {
    return (
        <div className="h-full my-0 content-center w-full top-[100px]">
            <div className="h-40 bg-header-background1">
                <AdaptedStrengthLogo />
            </div>
            <h3 className="relative text-center text-2xl bottom-10">Book your consultation below:</h3>
            <div className="bg-[#161A1D] h-full">
                <p className='text-white'>Calendly import here</p>
            </div>
        </div>)
};

export default CalendlyBooking;
