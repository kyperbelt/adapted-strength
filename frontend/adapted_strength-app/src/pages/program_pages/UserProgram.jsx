/*
Module: UserProgram.jsx - My Programs Page
*/
import React, { useEffect, useState } from "react";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { UserApi } from "../../api/UserApi";
import { YoutubeIcon, FilePenIcon } from "../../components/Icons";
import { useNavigate } from "react-router-dom";
import { BasicModalDialogue } from "../../components/Dialog";
import ProgressBar from "../../components/ProgressBar";

export default function General() {
  const [userProgramming, setUserProgramming] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progressData, setProgressData] = useState(null);
  const [completedRepCycleIds, setCompletedRepCycleIds] = useState(new Set());

  const loadProgressData = () => {
    Promise.all([
      UserApi.getUserProgressSummary(),
      UserApi.getCompletedRepCycleIds()
    ])
      .then(([progressData, completedData]) => {
        setProgressData(progressData);
        setCompletedRepCycleIds(new Set(completedData.completedRepCycleIds || []));
      })
      .catch((error) => {
        console.error("Error loading progress:", error);
      });
  };

  useEffect(() => {
    document.title = "My Programs - Adapted Strength";
    setIsLoading(true);
    
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
                userProgrammingId: program.userProgrammingId,
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
        setIsLoading(false);
        loadProgressData();
      })
      .catch((error) => {
        console.error("Error loading programs:", error);
        setIsLoading(false);
      });
  }, []);

  const handleComplete = (repCycleId, isCurrentlyCompleted) => {
    const apiCall = isCurrentlyCompleted 
      ? UserApi.unmarkMovementComplete(repCycleId)
      : UserApi.markMovementComplete(repCycleId);
    
    apiCall
      .then(() => {
        loadProgressData();
      })
      .catch((error) => {
        console.error("Error toggling completion:", error);
        alert("Failed to update completion status. Please try again.");
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your programs...</p>
        </div>
      </div>
    );
  }

  if (!userProgramming || userProgramming.length === 0) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">No Programs Assigned</h1>
                <p className="text-gray-600 mb-6">
                  You don't have any training programs assigned yet. Contact Coach Alex to get started with your personalized training program.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Need help?</strong> Reach out to Coach Alex to discuss your fitness goals and get a customized program designed just for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Programs</h1>
          <p className="text-gray-600">Your personalized training programs</p>
        </div>
        
        <div className="space-y-8">
          {userProgramming.map((userProgram, index) => {
            const programProgress = progressData?.programs?.find(
              p => p.userProgrammingId === userProgram.userProgrammingId
            );
            
            return (
              <ProgramPuller 
                key={index}
                program={userProgram.userProgram}
                currentWeek={userProgram.currentWeek}
                userProgrammingId={userProgram.userProgrammingId}
                progressData={programProgress}
                onComplete={handleComplete}
                completedRepCycleIds={completedRepCycleIds}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProgramPuller({ program, currentWeek, userProgrammingId, progressData, onComplete, completedRepCycleIds }) {
  if (currentWeek <= 0 || currentWeek > program.weeks.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              This program is not available to you right now. Please contact your coach for assistance.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const week = program.weeks[currentWeek - 1];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Program Header */}
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">{program.name}</h2>
          {progressData && (
            <span className="text-sm text-gray-300">
              {progressData.completedMovements} / {progressData.totalMovements} completed
            </span>
          )}
        </div>
        <p className="text-gray-300 mb-3">Week {currentWeek}: {week.name}</p>
        {progressData && (
          <ProgressBar 
            percentage={progressData.completionPercentage} 
          />
        )}
      </div>

      {/* Days */}
      <div className="p-6">
        <div className="space-y-4">
          {week.days.map((day, index) => (
            <DayComponent key={index} day={day} onComplete={onComplete} completedRepCycleIds={completedRepCycleIds} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DayComponent({ day, onComplete, completedRepCycleIds }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
      >
        <h3 className="font-semibold text-gray-900">{day.name}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {day.repCycles.length} movement{day.repCycles.length !== 1 ? 's' : ''}
          </span>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-4 space-y-4">
            {day.repCycles.map((repCycle, index) => (
              <RepCycle 
                key={index} 
                repCycle={repCycle} 
                onComplete={onComplete} 
                isCompleted={completedRepCycleIds.has(repCycle.repCycleId)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RepCycle({ repCycle, onComplete, isCompleted }) {
  const navigate = useNavigate();
  const [notesOpen, setNotesOpen] = useState(false);

  const handleCheckboxChange = () => {
    onComplete(repCycle.repCycleId, isCompleted);
  };

  return (
    <div className={`bg-gray-50 rounded-lg p-4 border border-gray-200 ${isCompleted ? 'opacity-60' : ''}`}>
      {/* Movement Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <input 
            type="checkbox" 
            checked={isCompleted} 
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
            title={isCompleted ? "Uncheck to mark incomplete" : "Mark as complete"}
          />
          <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {repCycle.workoutOrder}
          </div>
          <h4 className={`font-semibold text-gray-900 ${isCompleted ? 'line-through' : ''}`}>
            {repCycle.name}
          </h4>
        </div>
        
        <div className="flex items-center space-x-2">
          {repCycle.coachNotes && (
            <button
              onClick={() => setNotesOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="View Coach Notes"
            >
              <FilePenIcon className="h-5 w-5" />
            </button>
          )}
          
          {repCycle.movementId && (
            <button
              onClick={() => navigate(`/movement-library/${repCycle.movementId}`)}
              className="p-2 text-red-600 hover:text-red-700 transition-colors"
              title="Watch Movement Video"
            >
              <YoutubeIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Movement Details */}
      <div className="bg-white rounded border border-gray-200 overflow-hidden">
        {/* Desktop: Table layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-0 text-xs font-medium text-gray-500 bg-gray-100">
            <div className="px-3 py-2 text-center border-r border-gray-200">Equipment</div>
            <div className="px-3 py-2 text-center border-r border-gray-200">Sets</div>
            <div className="px-3 py-2 text-center border-r border-gray-200">Reps/Time</div>
            <div className="px-3 py-2 text-center border-r border-gray-200">% / RPE</div>
            <div className="px-3 py-2 text-center">Rest</div>
          </div>
          
          <div className="grid grid-cols-5 gap-0 text-sm text-gray-900">
            <div className="px-3 py-3 text-center border-r border-gray-200 bg-gray-50">
              {repCycle.equipment || "—"}
            </div>
            <div className="px-3 py-3 text-center border-r border-gray-200">
              {repCycle.numSets || "—"}
            </div>
            <div className="px-3 py-3 text-center border-r border-gray-200 bg-gray-50">
              {repCycle.numReps || "—"}
            </div>
            <div className="px-3 py-3 text-center border-r border-gray-200">
              {repCycle.weight || "—"}
            </div>
            <div className="px-3 py-3 text-center bg-gray-50">
              {repCycle.restTime || "—"}
            </div>
          </div>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="md:hidden divide-y divide-gray-200">
          <div className="flex justify-between px-4 py-2">
            <span className="text-sm font-medium text-gray-500">Equipment</span>
            <span className="text-sm text-gray-900">{repCycle.equipment || "—"}</span>
          </div>
          <div className="flex justify-between px-4 py-2 bg-gray-50">
            <span className="text-sm font-medium text-gray-500">Sets</span>
            <span className="text-sm text-gray-900">{repCycle.numSets || "—"}</span>
          </div>
          <div className="flex justify-between px-4 py-2">
            <span className="text-sm font-medium text-gray-500">Reps/Time</span>
            <span className="text-sm text-gray-900">{repCycle.numReps || "—"}</span>
          </div>
          <div className="flex justify-between px-4 py-2 bg-gray-50">
            <span className="text-sm font-medium text-gray-500">% / RPE</span>
            <span className="text-sm text-gray-900">{repCycle.weight || "—"}</span>
          </div>
          <div className="flex justify-between px-4 py-2">
            <span className="text-sm font-medium text-gray-500">Rest</span>
            <span className="text-sm text-gray-900">{repCycle.restTime || "—"}</span>
          </div>
        </div>
      </div>

      {/* Coach Notes Modal */}
      {notesOpen && (
        <BasicModalDialogue 
          title="Coach Notes" 
          onCloseDialog={() => setNotesOpen(false)}
        >
          <div className="p-4">
            <p className="text-gray-700 whitespace-pre-wrap">
              {repCycle.coachNotes || "No notes available for this movement."}
            </p>
          </div>
        </BasicModalDialogue>
      )}
    </div>
  );
}
