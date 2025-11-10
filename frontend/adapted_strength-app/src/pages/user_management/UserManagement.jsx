import { UserApi } from "../../api/UserApi";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { BlankPageContainer } from "../../components/PageContainer";
import {
  CustomTableRow,
  SearchBar,
  StyledCheckboxTable,
} from "../program_management/Tables";
import { levenshteinDistance } from "../../util/search";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { PrimaryButton } from "../../components/Button";
import { TrashIcon } from "../../components/Icons";
import ProgressBar from "../../components/ProgressBar";

function getAllPrograms() {
  try {
    return ProgrammingApi.getAllPrograms().then((data) => {
      // cleanse data, only return in formated program structure
      const programs = data.map((program) => {
        console.log("Program: ", program);
        return {
          id: program.programId,
          name: program.name,
          description: program.description.body,
          selected: false,
          // map array of week objects to just an array of week ids
          weeks: program.weeks,
        };
      });
      return programs;
    });
  } catch (e) {
    console.error("Error getting all programs:", e);
    throw e;
  }
}

function getFilteredUsers(users, searchText) {
  if (!searchText || searchText === "") {
    return users;
  }
  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.subscription.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      levenshteinDistance(user.name.toLowerCase(), searchText.toLowerCase()) <
      3 ||
      levenshteinDistance(
        user.subscription.toLowerCase(),
        searchText.toLowerCase()
      ) < 3 ||
      levenshteinDistance(user.email.toLowerCase(), searchText.toLowerCase()) <
      3
    );
  });
}

export default function UserManagement() {
  const nav = useNavigate();
  const loc = useLocation();
  const url = loc.pathname;
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [subscriptionTiers, setSubscriptionTiers] = useState([]);
  const [usersProgress, setUsersProgress] = useState([]);

  const userUpdated = (user) => {
    console.log("User Updated: ", user);
    setUsers(users.map(u => u.email === user.email ? user : u));
  }

  if (!loc.pathname.endsWith("/user-management") && !selectedUser) {
    setTimeout(() => {
      nav("/user-management");
    });
  }

  useEffect(() => {
    window.onpopstate = () => {
      setSelectedUser(null);
    };

    getAllPrograms()
      .then((data) => {
        setPrograms(data);
      })
      .catch((_error) => {
        console.log(`Error fetching programs: ${_error}`);
      });
  }, []);

  useEffect(() => {
    // // Fetch users here
    // let users = null;

    UserApi.getSubscriptionTiers().then((tiers) => {
      setSubscriptionTiers(tiers);
    });

    // if (programs.length === 0) return;

    UserApi.getAllUsers()
      .then((data) => {
        const getUserPrograms = async (userId) => {
          const userPrograms = await UserApi.getProgramming(userId);
          return userPrograms;
        };


        // users = data.map((user) => {
        //     return {
        //         email: user.email,
        //         name: `${user.firstName} ${user.lastName}`,
        //         subscription: user.subscriptionTier,
        //         programs: getUserPrograms(user.userId)
        //     };
        // });

        const users = data.map((user) => {
          return getUserPrograms(user.email);
        });

        return Promise.all(users).then((userProgramsResult) => {
          return data.map((user) => {
            const userPrograms = userProgramsResult
              .filter((program) => program.user_email === user.email)
              .map((program) => program.subscribed_programs)
              .flat()
              .map((program) => {
                console.log("UserProgram: ", program);
                console.log("Programs: ", programs);

                const foundProgram = programs.find((p) => p.id === program.assignedProgramId);
                return {
                  ...program,
                  name: foundProgram ? foundProgram.name : "Unknown Program",
                };
              });
            return {
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              subscription: user.subscriptionTier === "ACTIVE" ? "Active" : "Inactive",
              programs: userPrograms,
            };
          });
        });
      })
      .then((users) => {
        setUsers(users);
        console.log("Users: ", users);
        
        // Fetch progress data for all users
        UserApi.getAllUsersProgress()
          .then((progressData) => {
            setUsersProgress(progressData);
          })
          .catch((error) => {
            console.error("Error fetching progress: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  }, [programs]);

  function onAllSelected(selected) {
    console.log("All selected: ", selected);
  }

  function OptionSelected(option) {
    console.log("Option selected: ", option);
  }

  function onSearch(text) {
    // console.log("Searching for: ", text);
    setSearchText(text);
  }

  function onUserClicked(user) {
    // navigate to the page relative to this address
    nav(`${user.email}`, { replace: false, relative: false });
    setSelectedUser(user);
  }

  return (
    <BlankPageContainer id="user-management">
      <BreadCrumb
        className="sticky top-0 z-10 shadow-md"
        first={{
          name: "Users",
          to: "/user-management",
          callback: () => {
            setSelectedUser(null);
          },
        }}
        breadCrumbs={selectedUser ? [{ name: selectedUser.name, to: `#` }] : []}
      />
      {!selectedUser && (
        <>
          <SearchBar onSearch={onSearch} />
          
          {/* Desktop: Table view */}
          <div className="hidden lg:block overflow-x-auto">
            <StyledCheckboxTable
              headers={["Email", "Name", "Subscription", "Program(s)", "Progress", "Last Activity"]}
              options={["Nuffin"]}
              onAllSelected={onAllSelected}
              onOptionsClick={OptionSelected}
            >
              {getFilteredUsers(users, searchText).map((user, index) => {
                const userProgress = usersProgress.find(p => p.email === user.email);
                const progressPercent = userProgress?.overallProgress || 0;
                const lastActivity = userProgress?.lastActivity 
                  ? new Date(userProgress.lastActivity).toLocaleDateString() 
                  : "Never";
                
                return (
                  <CustomTableRow
                    options={["Edit"]}
                    key={user.email}
                    data={[
                      user.email,
                      user.name,
                      user.subscription,
                      user.programs.length,
                      `${progressPercent}%`,
                      lastActivity,
                    ]}
                    onRowClick={() => onUserClicked(user)}
                  />
                );
              })}
            </StyledCheckboxTable>
          </div>

          {/* Mobile/Tablet: Card view */}
          <div className="lg:hidden space-y-3 p-4">
            {getFilteredUsers(users, searchText).map((user) => {
              const userProgress = usersProgress.find(p => p.email === user.email);
              const progressPercent = userProgress?.overallProgress || 0;
              const lastActivity = userProgress?.lastActivity 
                ? new Date(userProgress.lastActivity).toLocaleDateString() 
                : "Never";
              
              return (
                <div 
                  key={user.email}
                  onClick={() => onUserClicked(user)}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm active:bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      user.subscription === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.subscription}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Programs:</span>
                      <span className="text-gray-900 font-medium">{user.programs.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progress:</span>
                      <span className="text-gray-900 font-medium">{progressPercent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Activity:</span>
                      <span className="text-gray-900 font-medium">{lastActivity}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {selectedUser && (
        <UserDashboard userUpdatedFunction={userUpdated} selectedUser={selectedUser} programs={programs} tiers={subscriptionTiers} />
      )}
    </BlankPageContainer>
  );
}

function UserDashboard({ userUpdatedFunction, selectedUser, programs, tiers }) {
  const [assignedPrograms, setAssignedPrograms] = useState(
    selectedUser.programs || []
  );
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [userProgress, setUserProgress] = useState(null);

  const getFilteredPrograms = (programs, searchText, assignedPrograms) => {
    const assignedIds = new Set(
      assignedPrograms.map((p) => p.assignedProgramId)
    );
    console.log("Assigned IDs: ", assignedIds);
    const filteredPrograms = programs.filter((program) => {
      return !assignedIds.has(program.id);
    });

    console.log("Filtered Programs: ", filteredPrograms);
    if (!searchText || searchText === "") {
      return filteredPrograms ?? [];
    }
    return filteredPrograms.filter((program) => {
      return (
        program.name.toLowerCase().includes(searchText.toLowerCase()) ||
        // program.description.toLowerCase().includes(searchText.toLowerCase()) ||
        levenshteinDistance(program.name, searchText) < 3 //||
        // levenshteinDistance(program.description, searchText) < 3
      );
    });
  };

  useEffect(() => {
    UserApi.getUserSubscription({ email: selectedUser.email }).then(response => {
      console.log("USER SUBSCRIBTION:\n", response);
      setSubscriptionInfo(response);
    });
    
    // Fetch user progress
    UserApi.getUserProgressSummary()
      .then((data) => {
        // Filter for this user's programs
        const userProgramIds = assignedPrograms.map(p => p.userProgrammingId);
        const filteredProgress = data.programs?.filter(p => 
          userProgramIds.includes(p.userProgrammingId)
        );
        setUserProgress(filteredProgress);
      })
      .catch((error) => {
        console.error("Error fetching user progress:", error);
      });
  }, [assignedPrograms]);

  useEffect(() => {
    // Assuming `programs` includes all programs, we filter out those already assigned
    console.log("Assigned Programs: ", assignedPrograms);
    const assignedIds = new Set(assignedPrograms.map((p) => p.id));

    const available = programs.filter((p) => !assignedIds.has(p.id));
    setAvailablePrograms(available);
  }, [programs, assignedPrograms]);

  if (subscriptionInfo == null) {
    return null;
  }


  console.log("SelectedPRogram: ", selectedProgram);
  const handleAssignProgram = async (startWeek, startDate) => {
    // Function to call API to assign the program
    const programming = await UserApi.addProgramming(
      selectedUser.email,
      selectedProgram.id,
      startWeek,
      startDate
    );
    if (!programming) {
      console.log("Error assigning program");
      return;
    }

    console.log("Programming: ", programming);

    const updatedAssignedPrograms = [
      ...assignedPrograms,
      { ...programming, name: selectedProgram.name },
    ];
    setAssignedPrograms(updatedAssignedPrograms);
    // TODO: add a modal here
    setSelectedProgram(null);
  };

  const onSearch = (text) => {
    setSearchText(text);
  };

  const onRemoveProgram = (program) => {
    console.log("Removing program: ", program);
    // Function to remove program from user

    const newAssignedPRograms = assignedPrograms.filter(
      (p) => p.assignedProgramId !== program.assignedProgramId
    );

    UserApi.deleteProgramming(program.userProgrammingId)
      .then(() => {
        setAssignedPrograms(newAssignedPRograms);
      })
      .catch((error) => {
        console.error("Error removing program: ", error);
      });
  };

  return (
    <div className="flex flex-col h-full items-center space-y-4 bg-gray-100 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-700">
        User Dashboard
      </h1>
      <h2 className="text-xl font-semibold text-center text-gray-600">
        {selectedUser.name}
      </h2>
      <SubscriptionManagement userUpdatedFunction={userUpdatedFunction} user={selectedUser} tiers={tiers} subscriptionInfo={subscriptionInfo} />
      
      {/* Progress Overview Section */}
      {userProgress && userProgress.length > 0 && (
        <div className="w-full p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Progress Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProgress.map((programProgress) => {
              const program = assignedPrograms.find(p => p.userProgrammingId === programProgress.userProgrammingId);
              return (
                <ProgramProgressCard 
                  key={programProgress.userProgrammingId}
                  programProgress={programProgress}
                  program={program}
                  userEmail={selectedUser.email}
                  programs={programs}
                />
              );
            })}
          </div>
        </div>
      )}
      
      <div className="w-full p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Assigned Programs
        </h3>
        
        {/* Desktop: Table view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/5 px-4 py-2">Program</th>
                <th className="w-1/5 px-4 py-2">Start Date</th>
                <th className="w-1/5 px-4 py-2">Start Week</th>
                <th className="w-1/5 px-4 py-2">Current Week</th>
                <th className="w-1/5 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedPrograms.map((program, index) => (
                <tr
                  key={program.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"}
                >
                  <td className="border px-4 py-2">{program.name}</td>
                  <td className="border px-4 py-2">
                    {new Date(program.startDate).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="border px-4 py-2">{program.startWeek}</td>
                  <td className="border px-4 py-2">
                    {
                      ProgrammingApi.getCurrentWeek(
                        program.startDate,
                        program.startWeek
                      )
                    }
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      className="text-red-500 hover:text-accent-light focus:text-accent-dark"
                      onClick={() => onRemoveProgram(program)}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card view */}
        <div className="md:hidden space-y-3">
          {assignedPrograms.map((program) => (
            <div key={program.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{program.name}</h4>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onRemoveProgram(program)}
                >
                  <TrashIcon />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="text-gray-900">
                    {new Date(program.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Week:</span>
                  <span className="text-gray-900">{program.startWeek}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Week:</span>
                  <span className="text-gray-900">
                    {ProgrammingApi.getCurrentWeek(program.startDate, program.startWeek)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="w-full md:flex-1 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-600">
              Available Programs
            </h3>
            <SearchBar onSearch={onSearch} />
          </div>
          {getFilteredPrograms(
            availablePrograms,
            searchText,
            assignedPrograms
          ).map((program) => (
            <button
              key={program.id}
              onClick={() => setSelectedProgram(program)}
              className="w-full text-left p-2 bg-gray-50 rounded-md mb-2 hover:bg-gray-200 transition-colors duration-200"
            >
              {program.name}
            </button>
          ))}
        </div>
        {selectedProgram && (
          <AssignProgram
            selectedProgram={selectedProgram}
            handleAssignProgram={handleAssignProgram}
          />
        )}
      </div>
    </div>
  );
}

function AssignProgram({ selectedProgram, handleAssignProgram }) {
  const [startWeek, setStartWeek] = useState(1);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="w-full md:w-80 p-4 bg-white rounded-lg shadow-sm">
      <h4 className="text-lg font-semibold text-gray-600 mb-2">
        Assign Program: {selectedProgram.name}
      </h4>
      <label className="block mb-2">
        <span className="text-gray-700">Start Week:</span>
        <input
          type="number"
          value={startWeek}
          onChange={(e) => setStartWeek(Number(e.target.value))}
          min="1"
          max={selectedProgram.weeks.length}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Start Date:</span>
        <input
          type="date"
          value={startDate.toISOString().slice(0, 10)}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <PrimaryButton
        onClick={() => handleAssignProgram(startWeek, startDate)}
        className="w-full py-2 px-4 "
      >
        Assign
      </PrimaryButton>
    </div>
  );
}

function SubscriptionManagement({ user, tiers, subscriptionInfo, userUpdatedFunction }) {
  // Convert display value back to enum value for backend
  const getEnumValue = (displayValue) => {
    return displayValue === "Active" ? "ACTIVE" : "INACTIVE";
  };

  const getDisplayValue = (enumValue) => {
    return enumValue === "ACTIVE" ? "Active" : "Inactive";
  };

  const [subscription, setSubscription] = useState(getEnumValue(user.subscription));
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscriptionChange = () => {
    console.log("Updating subscription status to:", subscription);
    
    UserApi.changeSubscribtionForUser({ 
      email: user.email, 
      status: subscription, 
      expirationDate: null // No longer using expiration dates
    }).then(response => {
      console.log(response);
      setErrorMessage("Updated Successfully!");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      // Update the user object with display value
      user.subscription = getDisplayValue(subscription);
      userUpdatedFunction(user);
    }).catch(e => {
      console.log(e);
      setErrorMessage("Failed to update subscription");
    });
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm lg:max-w-screen-sm">
      <h3 className="text-lg font-semibold text-gray-600 mb-2">Subscription Management</h3>
      <span className={`text-red-500 ${(errorMessage === '' ? 'hidden' : '')}`}>{errorMessage}</span>
      <div className="mb-4">
        <label className="block text-gray-700">Current Subscription:</label>
        <select
          value={subscription}
          onChange={(e) => setSubscription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {tiers.map((tier) => (
            <option key={tier} value={tier}>
              {getDisplayValue(tier)}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Subscription management is now simplified to Active/Inactive status only. 
              No expiration dates are required as Alex handles subscription details manually.
            </p>
          </div>
        </div>
      </div>
      <PrimaryButton onClick={handleSubscriptionChange} className="w-full py-2 px-4">
        Update Subscription
      </PrimaryButton>
    </div>
  );
}

function ProgramProgressCard({ programProgress, program, userEmail, programs }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [completionDetails, setCompletionDetails] = useState(null);
  const [programData, setProgramData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExpand = () => {
    if (!isExpanded && !completionDetails) {
      setIsLoading(true);
      Promise.all([
        UserApi.getProgramCompletionDetails(programProgress.userProgrammingId, userEmail),
        ProgrammingApi.getProgram(programProgress.programId)
      ])
        .then(([details, programData]) => {
          setCompletionDetails(details.completions);
          setProgramData(programData);
          setIsExpanded(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error loading completion details:", error);
          setIsLoading(false);
        });
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={handleExpand}
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900">{programProgress.programName}</h4>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="mb-3">
          <ProgressBar 
            percentage={programProgress.completionPercentage || 0} 
            label="Progress"
          />
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Completed: {programProgress.completedMovements} / {programProgress.totalMovements} movements</p>
          <p className="text-xs text-gray-500">
            Last activity: {programProgress.lastActivity 
              ? new Date(programProgress.lastActivity).toLocaleDateString() 
              : "Never"}
          </p>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading details...</p>
          ) : programData && completionDetails ? (
            <div className="space-y-3">
              {programData.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="bg-white rounded p-3">
                  <h5 className="font-medium text-sm text-gray-700 mb-2">{week.name}</h5>
                  {week.days.map((day, dayIdx) => (
                    <div key={dayIdx} className="ml-2 mb-2">
                      <p className="text-xs font-medium text-gray-600 mb-1">{day.name}</p>
                      <div className="ml-2 space-y-1">
                        {day.repCycles.map((repCycle, rcIdx) => {
                          const completion = completionDetails[repCycle.repCycleId];
                          return (
                            <div key={rcIdx} className="flex items-center justify-between text-xs">
                              <span className={completion ? "text-green-600" : "text-gray-400"}>
                                {completion ? "✓" : "○"} {repCycle.name}
                              </span>
                              {completion && (
                                <span className="text-gray-500">
                                  {new Date(completion.completedAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No details available</p>
          )}
        </div>
      )}
    </div>
  );
}
