import BreadCrumb from "../../components/BreadCrumb";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { CardBack } from "../../components/Card";
import { BasicModalDialogue } from "../../components/Dialog";
import LabeledInputField from "../../components/forms/LabeledInputField";
import { StyledCheckboxTable, CustomTableRow, SearchBar } from "./Tables";
import { HttpStatus } from "../../api/ApiUtils";
import { useNavigate, useLocation } from "react-router-dom";
import { BasicTextArea } from '../../components/TextArea';

import { useState, useEffect } from "react";


export default function DayDashboard({ breadCrumbState, ...props }) {

        const nav = useNavigate();
        const loc = useLocation();
        const url = loc.pathname;
        const [breadcrumb, setBreadcrumb] = breadCrumbState;
        const [days, setDays] = useState([]);
        const [dayEditId, setDayEditId] = useState(null);
        const [selectedWeek, setSelectedWeek] = useState(null);

        const [selectedProgram, setSelectedProgram] = useState(null);

        useEffect(() => {
                ProgrammingApi.getProgram(breadcrumb[0]).then((data) => {
                        setSelectedProgram(data);
                        console.log("Program data: ", data);
                        const week = data.weeks.find((week) => week.weekId == breadcrumb[1]);
                        console.log("Week id: ", breadcrumb[1]);
                        console.log("Week data: ", week);
                        setSelectedWeek(week);

                        const days = week.days.map((day) => {
                                return {
                                        dayId: day.dayId,
                                        name: day.name,
                                        description: "",
                                        selected: false,
                                        open: false,
                                        repCycles: day.repCycles,
                                };
                        });
                        console.log("Days: ", days);
                        setDays(days);
                }).catch((error) => {
                        console.error(`Error getting program ${breadcrumb[0]}: ${error}`);
                });
        }, []);

        const OnDayClicked = (day) => {
                console.log("Day Clicked clicked: ", day);
                // TODO: pass the day object to the day page so that we dont have to fetch it again.
                //      should only fetch if the day object is not passed
                // nav(`${url}/${day.dayId}`, { relative: true });
                // TODO: expand the selected day, and collapse the rest 
                const newDays = days.map((d) => {
                        if (d.dayId === day.dayId) {
                                return { ...d, open: !d.open };
                        } else {
                                return { ...d, open: false };
                        }
                });
                setDays(newDays);
        };


        const DeleteDay = async (daysToDelete) => {

                let promiseList = [];
                const newDayss = days.filter((day) => !daysToDelete.includes(day));

                for (const day of daysToDelete) {
                        console.log(`Deleting day: ${day.dayId}`);
                        promiseList.push(ProgrammingApi.deleteDay(day.dayId).then((r) => {
                                if (r.status === HttpStatus.OK) {
                                        console.log(`Day ${day.dayId} deleted in week ${selectedWeek.weekId}`);
                                }
                        }).catch((error) => {
                                console.error('Error deleting day:', error);
                        }));
                }

                await Promise.all(promiseList).then(() => {
                        console.log(`All days deleted`);
                });
                setDays(newDayss);
        }

        const OptionSelected = (option) => {
                if (option === 'Delete Selected') {
                        const daysToDelete = days.filter((day) => day.selected);
                        console.log(`Delete Selected, so im deleting ${daysToDelete.length} days`);
                        DeleteDay(daysToDelete);
                }
        }

        const onAllSelected = (selected) => {
                console.log(`All selected: ${selected}`);
                const newDays = days.map((day) => {
                        return { ...day, selected };
                });
                setDays(newDays);
        }

        const onAddDay = () => {
                const currentDays = days;
                if (currentDays.length >= 7) {
                        console.log("Cannot create more than 7 days in a week");
                        //TODO: show a toast message here that lets alex know 
                        //      that he cannot add more than 7 days in a week
                        return;
                }
                const dayName = `Day ${currentDays.length + 1}`;
                const dayDescription = `Description for ${dayName}`;
                onCreateDay(dayName, dayDescription);
        }

        const onCreateDay = async (dayName, description) => {
                let newDay = null;

                try {
                        const createDayResponse = await ProgrammingApi.createDay({ dayName, description }).then((response) => {
                                if (response.status === HttpStatus.OK) {
                                        console.log("Day created: ", response.data);
                                        newDay = {
                                                dayId: response.data.dayId,
                                                name: response.data.name,
                                                description: response.data?.description?.body || "",
                                                selected: false
                                        };
                                        // update the program with the new week
                                        const updateWeekPayload = {
                                                weekId: selectedWeek.weekId,
                                                weekName: selectedWeek.name,
                                                weekDescription: "",
                                                dayIds: [...selectedWeek.days.map((day) => day.dayId), response.data.dayId]
                                        };
                                        console.log("Update week payload: ", updateWeekPayload);
                                        return ProgrammingApi.updateWeek(updateWeekPayload);
                                } else {
                                        throw new Error(`Error creating day: ${response.status}`);
                                }
                        });

                        if (createDayResponse.status === HttpStatus.OK) {
                                console.log("Week updated with new day: ", createDayResponse.data);
                                console.log("New day: ", newDay);
                                setDays([...days, newDay]);
                                setSelectedWeek(createDayResponse.data);
                        } else {
                                throw new Error(`Error updating day: ${createDayResponse.status}`);
                        }
                } catch (e) {
                        console.error('Error creating day:', e);
                }
        }

        return (selectedWeek &&
                <div className="flex flex-col px-6">

                        <BreadCrumb first={{ name: "Programs", to: "/program-management" }} breadCrumbs={[
                                { name: selectedProgram.name, to: `/program-management/${selectedProgram.programId}` },
                                { name: selectedWeek.name, to: `/program-management/${selectedProgram.programId}/${selectedWeek.weekId}` }
                        ]} />
                        <CardBack className="">
                                <div className="flex flex-col sm:flex-row mt-2">
                                        <SearchBar />
                                        <PrimaryButton
                                                className="sm:ml-auto w-32"
                                                onClick={onAddDay}>
                                                Add Day
                                        </PrimaryButton>
                                </div>
                                <StyledCheckboxTable headers={["Name", "Description"]} onAllSelected={onAllSelected} onOptionsClick={OptionSelected}>
                                        {days.map((day) => (
                                                <>
                                                        <CustomTableRow
                                                                key={day.dayId}
                                                                data={[
                                                                        day.name,
                                                                        day.description,
                                                                ]}
                                                                onOptionClick={(option) => {
                                                                        if (option === 'Delete') {
                                                                                DeleteDay([day]);
                                                                        } else if (option === 'Edit') {
                                                                                document.getElementById("edit-day").classList.remove("hidden");
                                                                                setDayEditId(day.dayId);
                                                                        }
                                                                }}
                                                                selected={day.selected}
                                                                onRowClick={() => OnDayClicked(day)}
                                                                onClick={() => {
                                                                        const newDays = days.map((b) => {
                                                                                if (b.dayId === day.dayId) {
                                                                                        return { ...b, selected: !b.selected };
                                                                                }
                                                                                return b;
                                                                        });
                                                                        setDays(newDays);
                                                                        console.log(`Day ${day.dayId} selected: ${day.selected}`);
                                                                }}
                                                        />

                                                        {day.open && <RepCycleContainer day={day} />}
                                                </>
                                        ))}
                                </StyledCheckboxTable>
                        </CardBack>
                        <EditDayDialog dayId={dayEditId} dayState={[days, setDays]} id="edit-day" className="hidden" title="Edit Day" onClose={() => { document.getElementById("edit-day").classList.add("hidden") }} />

                </div>
        );
}


function EditDayDialog({ dayId, dayState, className, ...props }) {

        const [days, setDays] = dayState;

        const day = days.find((day) => day.dayId === dayId);
        const nameInput = document.getElementById("edit_day_name_field");
        const descriptionInput = document.getElementById("edit_day_description");
        if (day) {
                nameInput.value = day.name;
                descriptionInput.value = day.description;
        }

        const onEdit = async (e) => {
                e.preventDefault();
                const name = document.getElementById("edit_day_name_field").value;
                const description = document.getElementById("edit_day_description").value;

                const newDays = days.map((day) => {
                        if (day.dayId === dayId) {
                                return { ...day, name: name, description: description };
                        }
                        return day;
                });

                await ProgrammingApi.updateDay({ dayId: dayId, dayName: name, dayDescription: description }).then((r) => {
                        if (r.status === HttpStatus.OK) {
                                console.log("Day updated: ", name, description);
                                return r;
                        } else {
                                throw new Error("Error updating day with status: " + r.status);
                        }
                }
                ).catch((e) => {
                        console.error('Error updating day:', e);
                });


                setDays(newDays);

                // clear the form
                document.getElementById("edit_day_name_field").value = "";
                document.getElementById("edit_day_description").value = "";

                document.getElementById("edit-day").classList.add("hidden");
        }
        return (
                <BasicModalDialogue id="edit-day" title={"Edit day"} className={className} onCloseDialog={props.onClose} {...props}>
                        <form onSubmit={onEdit}>
                                <LabeledInputField id="edit_day_name_field" placeholder="day Name" required={true} />
                                <BasicTextArea id="edit_day_description" label="day Description" placeholder="Describe this program here..." />
                                <div className="flex justify-end">
                                        <SecondaryButton onClick={props.onClose} className="mr-2">Cancel</SecondaryButton>
                                        <PrimaryButton type="submit" className="mr-2">Save</PrimaryButton>
                                </div>
                        </form>
                </BasicModalDialogue>
        );

}


function RepCycleContainer({ day }) {

        return (
                <tr className="bg-primary-dark w-full">
                        <td className="px-6 py-3" colSpan="4">
                                <div className="flex flex-col bg-black w-full flex-shrink">
                                        {day.repCycles.map((repCycle) => {
                                                return <RepCycle repCycle={repCycle} />
                                        })}
                                </div>
                                <button className="">
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd" />
                                        </svg>
                                </button>
                        </td>
                </tr>);
}

function RepCycle({ repCycle }) {

        return (
                <div className="flex flex-col bg-primary-light rounded-lg p-2 my-2">
                        hello
                </div>
        );
}
