/*
Module: General.jsx
Team: TeraBITE
*/
//import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import programFiller from "../../assets/blank_filler.png"
import { CardBack } from "../../components/Card";
import { ProgramMamagement } from "../../pages/ProgramManagement"

/*
function ClientField() {
    return (<input type="client" placeholder="Client" id="client" name="client" required className="w-4/5 border-b-4 p-0" />);
}
function SpecialtyField() {
    return (<input type="specialty" placeholder="Specialty" id="specialty" name="specialty" required className="w-4/5 border-b-4 p-0" />);
}
*/
export default function General() {
    const [showProgram, setShowProgram] = useState({
        fiveDay: false,
        fourDay: false,
        threeDay: false,
        days: {
            fiveDay: Array(5).fill(false),
            fourDay: Array(4).fill(false),
            threeDay: Array(3).fill(false)
        }
    }
    );
    const toggleProgram = (program) => {
        setShowProgram(prevState => ({
            ...prevState,
            [program]: !prevState[program]
        }));
    };
    const toggleDay = (program, index) => {
        setShowProgram(prevState => ({
            ...prevState,
            days: {
                ...prevState.days,
                [program]: prevState.days[program].map((value, i) => i === index ? !value : value)
            }
        }));
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
                        <button onClick={() => toggleProgram(`${days.toLowerCase()}Day`)} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold mt-2 px-0 pt-3 pb-3 bg-gray-200">
                            {showProgram[`${days.toLowerCase()}Day`] ? `Close ${days}-Day Program` : `Show ${days}-Day`}
                        </button>
                        {showProgram[`${days.toLowerCase()}Day`] && (
                            <CardBack className="xl:w-11/12 xl:mx-auto w-full">
                                <div className="overflow-x-auto">
                                    {showProgram.days[`${days.toLowerCase()}Day`].map((day, dayIndex) => (
                                        <button key={dayIndex} onClick={() => toggleDay(`${days.toLowerCase()}Day`, dayIndex)} className="w-500 border-solid border-2 border-black uppercase rounded-full font-bold p-3 bg-gray-200">
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
