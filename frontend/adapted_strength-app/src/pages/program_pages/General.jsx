import React, { useState } from "react";
import { CardBack } from "../../components/Card";

export default function General() {
    const [showPrograms, setShowPrograms] = useState({
        fiveDay: false,
        fourDay: false,
        threeDay: false
    });

    const [fiveDayProgram, setFiveDayProgram] = useState(Array(5).fill(false));
    const [fourDayProgram, setFourDayProgram] = useState(Array(4).fill(false));
    const [threeDayProgram, setThreeDayProgram] = useState(Array(3).fill(false));

    const toggleProgram = (program) => {
        setShowPrograms(prevState => ({
            ...prevState,
            [program]: !prevState[program]
        }));
    };

    const toggleDay = (program, index) => {
        switch (program) {
            case "fiveDay":
                setFiveDayProgram(prevState => prevState.map((day, i) => i === index ? !day : false));
                break;
            case "fourDay":
                setFourDayProgram(prevState => prevState.map((day, i) => i === index ? !day : false));
                break;
            case "threeDay":
                setThreeDayProgram(prevState => prevState.map((day, i) => i === index ? !day : false));
                break;
            default:
                break;
        }
    };

    return (
        <div className="w-full h-full flex flex-col bottom-20">
            <p className="bg-[#161A1D] text-white bottom-3 px-0 pt-8 pb-8">
                YOUR PROGRAM: General Strength!
            </p>
            <CardBack>
                <h1 className="font-bold uppercase">
                    March 1 - April 5
                </h1>
                {["Five", "Four", "Three"].map((days, index) => (
                    <div key={index}>
                        <button onClick={() => toggleProgram(`${days.toLowerCase()}Day`)} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold mt-1 mb-3 px-2 py-3 bg-gray-200">
                            {showPrograms[`${days.toLowerCase()}Day`] ? `Close ${days}-Day Program` : `Show ${days}-Day`}
                        </button>
                        {showPrograms[`${days.toLowerCase()}Day`] && (
                            <CardBack className="xl:w-11/12 xl:mx-auto w-full">
                                <div className="overflow-x-auto">
                                    {eval(`${days.toLowerCase()}DayProgram`).map((day, dayIndex) => (
                                        <button key={dayIndex} onClick={() => toggleDay(`${days.toLowerCase()}Day`, dayIndex)} className={`w-500 mr-1 border-solid border-2 border-black uppercase rounded-full font-bold p-2 ${day ? 'bg-[#f54242]' : 'bg-gray-200'}`}>
                                            {day ? 'Close' : `Day ${dayIndex + 1}`}
                                        </button>
                                    ))}
                                </div>
                            </CardBack>
                        )}
                    </div>
                ))}
            </CardBack>
        </div>
    );
}
