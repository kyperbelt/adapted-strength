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
    if (programs.length === 0) return;
    UserApi.getAllUsers()
      .then((data) => {
        const getUserPrograms = async (userId) => {
          const programs = await UserApi.getProgramming(userId);
          return programs;
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

                return {
                  ...program,
                  name: programs.find((p) => p.id === program.assignedProgramId)
                    .name,
                };
              });
            return {
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              subscription: user.subscriptionTier,
              programs: userPrograms,
            };
          });
        });
      })
      .then((users) => {
        setUsers(users);
        console.log("Users: ", users);
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
          <StyledCheckboxTable
            headers={["Email", "Name", "Subcription", "Program(s)"]}
            options={["Nuffin"]}
            onAllSelected={onAllSelected}
            onOptionsClick={OptionSelected}
          >
            {getFilteredUsers(users, searchText).map((user, index) => {
              return (
                <CustomTableRow
                  options={["Edit"]}
                  key={user.email}
                  data={[
                    user.email,
                    user.name,
                    user.subscription,
                    user.programs.length,
                  ]}
                  onRowClick={() => onUserClicked(user)}
                />
              );
            })}
          </StyledCheckboxTable>
        </>
      )}
      {selectedUser && (
        <UserDashboard selectedUser={selectedUser} programs={programs} />
      )}
    </BlankPageContainer>
  );
}

function UserDashboard({ selectedUser, programs }) {
  const [assignedPrograms, setAssignedPrograms] = useState(
    selectedUser.programs || []
  );
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchText, setSearchText] = useState("");

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
    // Assuming `programs` includes all programs, we filter out those already assigned
    console.log("Assigned Programs: ", assignedPrograms);
    const assignedIds = new Set(assignedPrograms.map((p) => p.id));

    const available = programs.filter((p) => !assignedIds.has(p.id));
    setAvailablePrograms(available);
  }, [programs, assignedPrograms]);

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
      <div className="w-full p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Assigned Programs
        </h3>
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/3 px-4 py-2">Program</th>
              <th className="w-1/3 px-4 py-2">Start Date</th>
              <th className="w-1/3 px-4 py-2">Start Week</th>
              <th className="w-1/3 px-4 py-2">Current Week</th>
              <th className="w-1/3 px-4 py-2">Actions</th>
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
                  {ProgrammingApi.getCurrentWeek(
                    program.startDate,
                    program.startWeek
                  )}
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
      <div className="flex flex-row w-full">
        <div className="w-full p-4 bg-white rounded-lg shadow-sm grow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
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
    <div className="w-fit p-4 bg-white rounded-lg shadow-sm">
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
