import React, { useEffect, useState } from "react";
import { CardBack } from "../../components/Card";

export default function General() {
    const [showPrograms, setShowPrograms] = useState({
        fiveDay: false,
        fourDay: false,
        threeDay: false
    });
    const [workouts, setWorkout] = useState([]);
    const adptdsURL = 'https://localhost:8080/v1/programming/week/all_weeks';

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(adptdsURL);
            const jsonData = await response.json();
            setWorkout(jsonData);
        };
        fetchData();

    }, []);

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
                setFiveDayProgram(prevState =>
                    prevState.map((day, i) => (i === index ? !day : false))
                );
                break;
            case "fourDay":
                setFourDayProgram(prevState =>
                    prevState.map((day, i) => (i === index ? !day : false))
                );
                break;
            case "threeDay":
                setThreeDayProgram(prevState =>
                    prevState.map((day, i) => (i === index ? !day : false))
                );
                break;
            default:
                break;
        }
    };

    const getTable = (days) => {
        if (!days.some(day => day)) return null;

        const alphabet = 'ABCDEFGHIJ';


        return (
            <table className="w-full text-left mt-4">
                <tbody className="rounded-full text-[#161A1D]">
                    {days.map((day, index) => (
                        <tr key={index}>
                            {/* LET "Order" AND "Exercise" CHANGE! 
                        This is hard coded for UI purposes */}
                            <div>
                                {workouts.map((week) => (
                                    <div key={week.weekId}>
                                        {week.name}

                                        {week.days.map((day) => (
                                            <div key={day.dayId}>
                                                {day.name}

                                                {day.repCycles.map((repCycle) => (
                                                    <div key={repCycle.repCycleId}>
                                                        {repCycle.name}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <th scope="col" className="px-1.5 py-1 border-solid border-2 border-black bg-gray-300">
                                {alphabet[index]}
                            </th>
                            <th scope="col" className="px-1.5 py-1 border-solid border-2 border-black bg-gray-300">
                                Movement {day.movement}
                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                    Equipment
                                </td>
                                <td scope="col" className="px-3 text-xs bg-gray-100">
                                    Sets
                                </td>
                                <td scope="col" className="px-3 text-xs bg-gray-200">
                                    Reps/Time
                                </td>
                                <td scope="col" className="px-3 text-xs bg-gray-100">
                                    % or RPE
                                </td>
                                <td scope="col" className="p-3 px-5 text-xs bg-gray-200">
                                    Rest
                                </td>
                                <tbody className="text-s rounded-full text-[#161A1D] bg-gray-100">
                                    <tr key={index}>
                                        <td className="border px-4 py-2">
                                            {day.equipment}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {day.sets}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {day.reps}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {day.weight}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {day.rest}
                                        </td>
                                    </tr>
                                </tbody>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
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
                                        <button onClick={() => toggleDay(`${days.toLowerCase()}Day`, dayIndex)} className={`w-500 mr-1 border-solid border-2 border-black uppercase rounded-full font-bold p-2 ${day ? 'bg-[#f54242]' : 'bg-gray-200'}`}>
                                            {day ? 'Close' : `Day ${dayIndex + 1}`}
                                        </button>
                                    ))}
                                </div>
                                {getTable(eval(`${days.toLowerCase()}DayProgram`).filter(day => day + 1))}
                            </CardBack>
                        )}
                    </div>
                ))}
            </CardBack>
        </div>
    );
}
