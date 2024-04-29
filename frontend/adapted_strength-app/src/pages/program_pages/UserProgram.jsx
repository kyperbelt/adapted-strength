/*
Module: General.jsx
*/
import React, { useEffect, useState } from "react";
import { CardBack } from "../../components/Card";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { UserApi } from "../../api/UserApi";

export default function General() {

  const [program, setProgram] = useState(null);
  const [userProgram, setUserProgram] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentDays, setCurrentDays] = useState(null);


  useEffect(() => {
    ProgrammingApi.getProgram(1)
      .then((data) => {
        const p = data;
        setProgram(p);
        setCurrentWeek(p.weeks[0]);
        setCurrentDays(p.weeks[0].days.map((day) => {
          return {
            ...day,
            toggled: false
          };
        }));
      });
  }, []);

  useEffect(() => {
    UserApi.getUserProgramming()
      .then((data) => {
        const p = data;
        setUserProgram(p);
      });
  }, []);


  if (!program) {
    return (<>Loading</>);
  }

  if (!userProgram) {
    return (
      <div className="w-full h-full flex flex-col bottom-20">
        <p className="bg-[#161A1D] text-white flex justify-center bottom-3 px-0 pt-8 pb-8">
          Your Program: NONE
        </p>
        <h1 className="font-bold flex justify-center">
          Looks like you don't  have a program yet!
        </h1>
        <h2 className="font-bold flex justify-center">
          Contact Coach Alex for help!
        </h2>
      </div>
    );
  }

  const getTable = (day) => {
    return (
      <table className="w-full text-left mt-4 min-h-full">
        <tbody className="text-[#161A1D]">
          {program &&
            day.repCycles.map((repCycle) => (
              <RepCycle repCycle={repCycle} />
            ))}
        </tbody>
      </table>
    );
  };

  const onDayClick = (day) => {
    const newDays = currentDays.map((day1) => {
      if (day1.dayId == day.dayId) {
        return {
          ...day1,
          toggled: !day1.toggled
        };
      }
      return { ...day1, toggled: false };
    })
    setCurrentDays(newDays);
  }
  return (
    <div className="w-full h-full flex flex-col bottom-20">
      <p className="bg-[#161A1D] text-white flex justify-center bottom-3 px-0 pt-8 pb-8">
        Your Program: {
          program &&
          program.name
        }
      </p>
      <h1 className="font-bold flex justify-center uppercase">
        {program && program.weeks[0].name}:
      </h1>
      <div>
        <CardBack className="xl:w-11/12 xl:mx-auto w-full h-full">
          <div className="overflow-x-auto flex flex-col text-left justify-center space-y-2 h-full">
            {currentDays.map((day, dayIndex) => (
              <>
                <button onClick={() => onDayClick(day)} className={`w-500 text-left pl-4 mx-4 border-solid border-2 border-black uppercase rounded-full font-bold p-2 ${day.toggled ? 'bg-[#f54242]' : 'bg-gray-200'}`}>
                  {day.toggled ? 'Close' : `Day ${dayIndex + 1}: ${day.name}`}
                </button>
                {day.toggled && getTable(day)}
              </>
            ))}
          </div>
        </CardBack>
      </div>
    </div>
  );
}


function RepCycle({ repCycle }) {
  return (
  <tr key={repCycle.repCycleId} className="text-center m-auto">
    <td className="m-auto px-2 border-solid border-2 border-black bg-gray-300 w-auto font-bold">
      {repCycle.workoutOrder}
    </td>
    <th scope="col" className="p-1.5 w-full border-solid border-2 border-black bg-gray-300">
      {repCycle.name}
      <div className="flex justify-center">
        <table className="w-full">
          <tbody>
            <tr>
              <td scope="col" className="px-1 w-auto text-xs bg-gray-200 text-center">
                Equipment
              </td>
              <td scope="col" className="px-1 w-auto text-xs bg-gray-100 text-center">
                Sets
              </td>
              <td scope="col" className="px-1 w-auto text-xs bg-gray-200 text-center">
                Reps/Time
              </td>
              <td scope="col" className="px-1 w-auto text-xs bg-gray-100 text-center">
                % / RPE
              </td>
              <td scope="col" className="p-1.5 w-auto text-xs bg-gray-200 text-center">
                Rest
              </td>
            </tr>
            <tr key={repCycle.repCycleId} className="text-s text-[#161A1D] bg-gray-100">
              <td className="border text-center bg-gray-200 px-1.5 py-2">
                {repCycle.equipment}
              </td>
              <td className="border text-center px-1.5 py-2">
                {repCycle.numSets}
              </td>
              <td className="border text-center bg-gray-200 px-1.5 py-2">
                {repCycle.numReps}
              </td>
              <td className="border text-center px-1.5 py-2">
                {repCycle.weight}
              </td>
              <td className="border text-center bg-gray-200 px-1.5 py-2">
                {repCycle.restTime}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </th>
  </tr>
);
}