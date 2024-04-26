import { UserApi } from "../../api/UserApi";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { BlankPageContainer } from "../../components/PageContainer";
import { CustomTableRow, SearchBar, StyledCheckboxTable } from "../program_management/Tables";
import { levenshteinDistance } from "../../util/search";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import ProgramDashboard from "../program_management/ProgramDashboard";

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
                    weeks: program.weeks
                };
            });
            return programs;
        });
    } catch (e) {
        console.error('Error getting all programs:', e);
        throw e;
    }
}

function getFilteredUsers(users, searchText) {
    if (!searchText || searchText === "") {
        return users;
    }
    return users.filter((user) => {
        return user.name.toLowerCase().includes(searchText.toLowerCase())
            || user.subscription.toLowerCase().includes(searchText.toLowerCase())
            || user.email.toLowerCase().includes(searchText.toLowerCase())
            || levenshteinDistance(user.name.toLowerCase(), searchText.toLowerCase()) < 3
            || levenshteinDistance(user.subscription.toLowerCase(), searchText.toLowerCase()) < 3
            || levenshteinDistance(user.email.toLowerCase(), searchText.toLowerCase()) < 3;
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
        }

        getAllPrograms().then((data) => {
            setPrograms(data);
        }).catch((_error) => {
            console.log(`Error fetching programs: ${_error}`);
        });

        // Fetch users here
        let users = null;
        UserApi.getAllUsers().then((data) => {

            const getUserPrograms = async (userId) => {
                const programs = await UserApi.getProgramming(userId);
                return programs;
            }

            // users = data.map((user) => {
            //     return {
            //         email: user.email,
            //         name: `${user.firstName} ${user.lastName}`,
            //         subscription: user.subscriptionTier,
            //         programs: getUserPrograms(user.userId)
            //     };
            // });

            users = data.map(user => {
                return getUserPrograms(user.email);
            });


            return Promise.all(users).then((programs) => {
                return data.map((user) => {
                    const userPrograms = programs.filter(program => program.user_email === user.email).map(program => program.subscribed_programs).flat();
                    return {
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        subscription: user.subscriptionTier,
                        programs: userPrograms
                    };
                });
            });

        }).then(users => {
            setUsers(users);
            console.log("Users: ", users);
        }).catch((error) => {
            console.error("Error fetching users: ", error);
        });
    }, []);

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
            <BreadCrumb first={{ name: "Users", to: "/user-management", callback: () => { setSelectedUser(null) } }} breadCrumbs={(selectedUser ? [{ name: selectedUser.name, to: `#` }] : [])} />
            {!selectedUser && <>
                <SearchBar onSearch={onSearch} />
                <StyledCheckboxTable headers={["Email", "Name", "Subcription", "Program(s)"]} options={["Nuffin"]} onAllSelected={onAllSelected} onOptionsClick={OptionSelected}>
                    {getFilteredUsers(users, searchText).map((user, index) => {
                        return (
                            <CustomTableRow
                                options={["Edit"]} key={user.email} data={[user.email, user.name, user.subscription, user.programs.length]}
                                onRowClick={() => onUserClicked(user)}
                            />
                        );
                    })}
                </StyledCheckboxTable>
            </>}
            {selectedUser && <UserDashboard selectedUser={selectedUser} programs={programs} />}
        </BlankPageContainer>
    );

}

function UserDashboard({ selectedUser, programs }) {
    const [assignedPrograms, setAssignedPrograms] = useState(selectedUser.programs || []);
    const [availablePrograms, setAvailablePrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [startWeek, setStartWeek] = useState(1);

    useEffect(() => {
        // Assuming `programs` includes all programs, we filter out those already assigned
        const assignedIds = new Set(assignedPrograms.map(p => p.id));
        const available = programs.filter(p => !assignedIds.has(p.id));
        setAvailablePrograms(available);
    }, [programs, assignedPrograms]);

    const handleAssignProgram = async () => {
        // Function to call API to assign the program
        const programming = await UserApi.addProgramming(selectedUser.email, selectedProgram.id, startWeek);
        if (!programming) {
            return;
        }

        console.log("Programming: ", programming);

        const updatedAssignedPrograms = [...assignedPrograms, { ...selectedProgram, startWeek }];
        setAssignedPrograms(updatedAssignedPrograms);
        // TODO: add a modal here
        setSelectedProgram(null);
        setStartWeek(1);
    };

    return (
        <div className="flex flex-col h-full items-center">
            <h1>User Dashboard</h1>
            <h2>{selectedUser.name}</h2>
            <div>
                <h3>Assigned Programs</h3>
                {assignedPrograms.map(program => (
                    <div key={program.id}>{program.name} - Start Week: {program.startWeek}</div>
                ))}
            </div>
            <div className="flex flex-col items-center">
                <h3>Available Programs</h3>
                {availablePrograms.map(program => (
                    <button key={program.id} onClick={() => setSelectedProgram(program)}>
                        {program.name}
                    </button>
                ))}
            </div>
            {selectedProgram && (
                <div>
                    <h4>Assign Program: {selectedProgram.name}</h4>
                    <label>
                        Start Week:
                        <input type="number" value={startWeek} onChange={e => setStartWeek(Number(e.target.value))} min="1" max={selectedProgram.weeks.length} />
                    </label>
                    <button onClick={handleAssignProgram}>Assign</button>
                </div>
            )}
        </div>
    );
}
