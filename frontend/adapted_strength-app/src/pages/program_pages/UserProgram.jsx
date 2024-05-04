/*
Module: General.jsx
*/
import React, { useEffect, useState } from "react";
import { CardBack } from "../../components/Card";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { UserApi } from "../../api/UserApi";
import PageContainer1, { PageContainer2, BlankPageContainer, BlankPageContainer1 } from "../../components/PageContainer";

export default function General() {
  const [userProgramming, setUserProgramming] = useState(null);

  useEffect(() => {
    UserApi.getUserProgramming()
      .then((data) => {
        return data.subscribed_programs;
      })
      .then((subscribed_programs) => {
        let programPromises = subscribed_programs.map((program) => {
          return ProgrammingApi.getProgram(program.assignedProgramId).then(
            (userProgram) => {
              return {
                startDate: program.startDate,
                startWeek: program.startWeek,
                currentWeek: ProgrammingApi.getCurrentWeek(
                  program.startDate,
                  program.startWeek
                ),
                userProgram: userProgram,
              };
            }
          );
        });

        return Promise.all(programPromises);
      })
      .then((programs) => {
        let userProgramming = programs;
        console.log("User Programming: ", userProgramming);
        setUserProgramming(userProgramming);
      });
  }, []);

  // TO GET THE PROGRAMMING use userProgramming to get the programming for this user. 

  // Steps 
  // Check that userProgramming is not null
  // If it is null, return a loading screen
  // If it is not null, render the user programming 
  // The userProgramming Structure is an Array of all the programs assigned to that user. 
  //
  // Each program contains the following fields:
  // startDate: The date the program started
  // startWeek: The week the program started
  // currentWeek: The current week of the program
  // userProgram: The actual program object that contains the program information 
  //
  // To access the first program for example you would do userProgramming[0].userProgram
  //
  // to get the current week for the first program you would do userProgramming[0].weeks[userProgramming[0].currentWeek]
  //
  // to get all the current weeks you would do const weeks = userProgramming.map(program => program.weeks[program.currentWeek])

  if (!userProgramming || userProgramming.length === 0) {
    return (
      <PageContainer2>
        <p className="bg-[#161A1D] text-white flex justify-center bottom-3 px-0 pt-8 pb-8">
          Your Program: NONE
        </p>
        <h1 className="font-bold flex justify-center">
          Looks like you don't have a program yet!
        </h1>
        <h2 className="font-bold flex justify-center">
          Contact Coach Alex for help!
        </h2>
      </PageContainer2>
    );
  }

  return <BlankPageContainer>
    {
      userProgramming.map((userProgram) => {
        return (
          <ProgramPuller program={userProgram.userProgram}
            currentWeek={userProgram.currentWeek}
          />
        )
      }
      )
    }
  </BlankPageContainer>;
}

function ProgramPuller({ program, currentWeek }) {
  if (currentWeek <= 0 || currentWeek > program.weeks.length) {
    return (
      <CardBack>
        <p className="bg-[#161A1D] text-white flex justify-center bottom-3 px-0 pt-8 pb-8">
        Your Program: {
          program.name
        }
      </p>
      <h1 className="font-bold text-center">
      This program is not available to you right now!
      </h1>
      </CardBack>
    )
  }

  const week = program.weeks[currentWeek - 1];

  function PullProgram({ day }) {
    const [showTable, setShowTable] = useState(false);
    const toggleButt = () => {
      setShowTable(!showTable);
    }
    return (
      <div className="pt-4">
        <button onClick={toggleButt} className="bg-slate-400 animate-slideLeft border-8 border-solid rounded-xl border-black 
        text-[#161A1D] font-bold text-center w-full py-2">
          {
            day.name
          }
          {showTable &&
            <table className="w-full text-left">
              <tbody className="text-[#161A1D] animate-fadeIn">
                {day.repCycles.map((repCycle) => (
                  <RepCycle repCycle={repCycle} />
                ))}
              </tbody>
            </table>}
        </button>

      </div>
    );
  }

  // -----This is the old code we deved together--------
  // const getTable = (day) => {
  //   return (
  //     <div className="pt-4">
  //       <h1 className="bg-[#161A1D] text-white font-bold text-center w-full py-2">
  //         {day.name}
  //       </h1>
  //       <table className="w-full text-left">
  //         <tbody className="text-[#161A1D]">
  //           {day.repCycles.map((repCycle) => (
  //             <RepCycle repCycle={repCycle} />
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };


  return (
    <div>
      <p className="bg-[#161A1D] text-white flex justify-center bottom-3 px-0 pt-8 pb-8">
        Your Program: {
          program.name
        }
      </p>
      <h1 className="font-bold flex justify-center uppercase">
        {week.name}
      </h1>
      <div>
        <CardBack className="xl:w-11/12 xl:mx-auto w-full h-full">

          <div className="overflow-x-auto flex flex-col text-left justify-center space-y-2 h-full">
            {
              week.days.map((day) => {
                return (
                  <PullProgram day={day} />
                );
              }
              )
            }
          </div>
        </CardBack>
      </div>
    </div>
  );
}

function RepCycle({ repCycle }) {
  return (
    <tr key={repCycle.repCycleId} className="text-center h-full m-auto">
      <td className="m-auto min-w-10 justify-center w-10 border-solid border-2 border-black bg-gray-300 font-bold">
        {repCycle.workoutOrder}
      </td>
      <th
        scope="col"
        className="p-1.5 w-full border-solid border-2 border-black bg-gray-300"
      >
        {repCycle.name}
        <div className="flex justify-center flex-col">
          <table className="w-full h-full">
            <tbody>
              <tr>
                <td
                  scope="col"
                  className="px-1 w-auto text-xs bg-gray-200 text-center"
                >
                  Equipment
                </td>
                <td
                  scope="col"
                  className="px-1 w-auto text-xs bg-gray-100 text-center"
                >
                  Sets
                </td>
                <td
                  scope="col"
                  className="px-1 w-auto text-xs bg-gray-200 text-center"
                >
                  Reps/Time
                </td>
                <td
                  scope="col"
                  className="px-1 w-auto text-xs bg-gray-100 text-center"
                >
                  % / RPE
                </td>
                <td
                  scope="col"
                  className="p-1.5 w-auto text-xs bg-gray-200 text-center"
                >
                  Rest
                </td>
              </tr>
              <tr
                key={repCycle.repCycleId}
                className="text-s text-[#161A1D] bg-gray-100"
              >
                <td className="border text-center min-w-10 max-w-16 bg-gray-200 px-1.5 py-2">
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
                <td className="border text-center min-w-10 max-w-16 bg-gray-200 px-1.5 py-2">
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
