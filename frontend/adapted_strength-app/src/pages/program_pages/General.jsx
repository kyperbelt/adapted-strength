/*
Module: General.jsx
*/
import React, { useEffect, useState } from "react";
import { CardBack } from "../../components/Card";
import { ProgrammingApi } from "../../api/ProgrammingApi";

export default function General() {
    const [showPrograms, setShowPrograms] = useState({
        fiveDay: false,
        fourDay: false,
        threeDay: false
    });

    const [program, setProgram] = useState(null);
    useEffect(() => {
        ProgrammingApi.getProgram(1)
            .then((data) => {
                const p = data;
                setProgram(p);
            });
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

    const getTable = (dayId) => {
        return (
          <table className="w-full text-left mt-4">
            <tbody className="rounded-full text-[#161A1D]">
              {program &&
                program.weeks[0].days
                  .filter((day) => day.dayId === dayId) // Filter based on dayId
                  .map((day) =>
                    day.repCycles.map((repCycle) => (
                      <tr key={repCycle.repCycleId}>
                        <td className="justify-center items-center px-1.5 border-solid border-2 border-black bg-gray-300 w-1/12 font-bold">
                          {repCycle.workoutOrder}
                        </td>
                        <th scope="col" className="px-1.5 mx-1 py-1 border-solid border-2 border-black bg-gray-300 w-screen">
                          Movement: {repCycle.name}
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
                          <td scope="col" className="p-3 px-5text-xs bg-gray-200">
                            Rest
                          </td>
                          <tbody className="text-s rounded-full text-[#161A1D] bg-gray-100">
                            <tr key={repCycle.repCycleId}>
                              <td className="border text-center px-4 py-2">
                                {repCycle.equipment}
                              </td>
                              <td className="border text-center px-4 py-2">
                                {repCycle.numSets}
                              </td>
                              <td className="border text-center px-4 py-2">
                                {repCycle.numReps}
                              </td>
                              <td className="border text-center px-4 py-2">
                                {repCycle.weight}
                              </td>
                              <td className="border text-center px-4 py-2">
                                {repCycle.restTime}
                              </td>
                            </tr>
                          </tbody>
                        </th>
                      </tr>
                    ))
                  )}
            </tbody>
          </table>
        );
      };
      
    return (
        <div className="w-full h-full flex flex-col bottom-20">
            <p className="bg-[#161A1D] text-white flex justify-center bottom-3 px-0 pt-8 pb-8">
                Your Program: {
                    program &&
                    program.name
                }
            </p>
            <CardBack>
                <h1 className="font-bold flex justify-center uppercase">
                    Week {program && program.weeks[0].weekId}:
                </h1>
                {["Five", "Four", "Three"].map((days, index) => (
                    <div key={index}>
                        <button onClick={() => toggleProgram(`${days.toLowerCase()}Day`)} className="w-full border-solid border-2 border-black uppercase rounded-full font-bold mt-1 mb-3 px-2 py-3 bg-gray-200">
                            {showPrograms[`${days.toLowerCase()}Day`] ? `Close ${days}-Day Program` : `Show ${days}-Day`}
                        </button>
                        {
                            showPrograms[`${days.toLowerCase()}Day`] && (
                                <CardBack className="xl:w-11/12 xl:mx-auto w-full">
                                    <div className="overflow-x-auto flex justify-center">
                                        {eval(`${days.toLowerCase()}DayProgram`).map((day, dayIndex) => (
                                            <button onClick={() => toggleDay(`${days.toLowerCase()}Day`, dayIndex)} className={`w-500 mr-1 border-solid border-2 border-black uppercase rounded-full font-bold p-2 ${day ? 'bg-[#f54242]' : 'bg-gray-200'}`}>
                                                {day ? 'Close' : `Day ${dayIndex + 1}`}
                                            </button>
                                        ))}
                                    </div>
                                    {eval(`${days.toLowerCase()}DayProgram`).some(day => day) && getTable(eval(`${days.toLowerCase()}DayProgram`).findIndex(day => day) + 1)}
                                </CardBack>
                            )
                        }
                    </div>
                ))}
            </CardBack>
        </div>
    );
}