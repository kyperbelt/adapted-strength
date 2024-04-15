/*
Module: General.jsx
*/
import React, { useEffect, useState } from "react";
import { CardBack } from "../../components/Card";

export default function General() {
    const [showPrograms, setShowPrograms] = useState({
        fiveDay: false,
        fourDay: false,
        threeDay: false
    });
    const [workouts, setWorkout] = useState([]);
    const adptdsURL = 'http://10.0.0.63:8080/v1/programming/day/all_days';
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjYXNleXRlc3RAZW1haWwuY29tIiwiaWF0IjoxNzEzMTM3MjM2LCJleHAiOjE3MTMyMjM2MzZ9.CWb3uwhCV-OiDlurgRTOpn14eDkxpiIpJmoZ3GnmuF0Y--kP4L_FbV18sy3jx5W1SRoRuTFIol-pATcwwqhd5g';
    // const fetchData = async () => {
    //     const response = await fetch(adptdsURL);
    //     const jsonData = await response.json();
    //     setWorkout(jsonData);
    // };
    // fetchData();
    // }, []);

    const [fiveDayProgram, setFiveDayProgram] = useState(Array(5).fill(false));
    const [fourDayProgram, setFourDayProgram] = useState(Array(4).fill(false));
    const [threeDayProgram, setThreeDayProgram] = useState(Array(3).fill(false));

    const toggleProgram = (program) => {
        setShowPrograms(prevState => ({
            ...prevState,
            [program]: !prevState[program]
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(adptdsURL, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const jsonData = await response.json();
            setShowPrograms(jsonData);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        };
    
        fetchData();
      }, []);

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
                            <th scope="col" className="px-1.5 py-1 border-solid border-2 border-black bg-gray-300">
                                {alphabet[index]}
                            </th>
                            <th scope="col" className="px-1.5 py-1 border-solid border-2 border-black bg-gray-300">
                                Movement
                                <td scope="col" className="px-1.5 text-xs bg-gray-200">
                                {showPrograms > 0 && (
                                    <div>
                                    {
                                        showPrograms.map((showPrograms) => (
                                            <div key={showPrograms.repCycles}>
                                                {showPrograms.repCycles.equipment}
                                            </div>
                                    ))}
                                    </div>
                                )}
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
                Welcome to your program?
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
