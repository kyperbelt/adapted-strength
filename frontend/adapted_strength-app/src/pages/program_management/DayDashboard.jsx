import BreadCrumb from "../../components/BreadCrumb";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { PrimaryButton, SecondaryButton, IconButton } from "../../components/Button";
import { CardBack, CardBack1 } from "../../components/Card";
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

        const [mode, setMode] = useState("create");
        const [selectedRepCycle, setSelectedRepCycle] = useState(null);
        const [repCycles, setRepCycles] = useState(day.repCycles);

        const addCycle = () => {
                console.log("Add Cycle");
                const form = document.getElementById(`rep-cycle-form-${day.dayId}`);
                form.classList.remove("hidden");
                setMode("create");
        }

        const editCycle = (repCycle) => {
                console.log("Edit Cycle: ", repCycle);
                const form = document.getElementById(`rep-cycle-form-${day.dayId}`);
                setMode("edit");
                setSelectedRepCycle(repCycle);
                form.classList.remove("hidden");
        }

        return (
                <tr className="bg-gray-200 w-full">
                        <td className="px-6 py-3" colSpan="4">
                                <div className="flex flex-col p-0 w-full">
                                        {repCycles.map((repCycle) => {
                                                return <RepCycle repCycle={repCycle} cycleState={[repCycles, setRepCycles]} />
                                        })}
                                </div>
                                <button className="mt-2 flex flex-row items-center italic text-secondary-dark hover:text-accent" onClick={addCycle}>
                                        <svg className="w-6 h-6 me-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd" />
                                        </svg> Add RepCycle
                                </button>
                                <RepCycleForm day={day} mode={mode} repCycle={selectedRepCycle} repCycleState={[repCycles, setRepCycles]} />
                        </td>
                </tr>);
}

function AreYouSureDialog({ onYes, onNo, ...props }) {
        return (
                <BasicModalDialogue className="hidden" id="are-you-sure" title="Are you Sure?" onCloseDialog={onNo}>
                        <div className="flex flex-row">
                                <PrimaryButton onClick={onYes}>Yes</PrimaryButton>
                                <SecondaryButton onClick={onNo}>No</SecondaryButton>
                        </div>
                </BasicModalDialogue>
        );
}

function RepCycle({ repCycle, cycleState }) {
        console.log("RepCycle: ", repCycle);
        const [repCycles, setRepCycles] = cycleState;

        const onDelete = async () => {
                console.log("Delete RepCycle: ", repCycle);
                await ProgrammingApi.deleteCycle(repCycle.repCycleId).then((r) => {
                        if (r.status === HttpStatus.OK) {
                                console.log("RepCycle deleted: ", repCycle.repCycleId);
                                const newCycles = repCycles.filter((cycle) => cycle.repCycleId !== repCycle.repCycleId);
                                setRepCycles(newCycles);
                                return r;
                        } else {
                                throw new Error("Error deleting rep cycle with status: " + r.status);
                        }
                }).catch((e) => {
                        console.error('Error deleting rep cycle:', e);
                });
                document.getElementById("are-you-sure").classList.add("hidden");
        }

        const deleteClicked = () => {
                document.getElementById("are-you-sure").classList.remove("hidden");
        }

        const closeAreYouSure = (e) => {
                e.target.closest("#are-you-sure").classList.add("hidden");
        }

        const { name, equipment, numSets, numReps, weight, restTime, coachNotes, workoutOrder, movementId } = repCycle;
        return (

                <CardBack1 className={`flex flex-col px-6 py-2 mb-2`}>
                        <AreYouSureDialog id="delete-rep-cycle" onYes={onDelete} onNo={closeAreYouSure} />
                        <div className="flex flex-row ms-2 items-center justify-items-center pt-2">
                                <div className="text-lg font-semibold mr-auto">{name}</div>
                                <IconButton className="p-2 bg-secondary-light me-2" onClick={() => { console.log("Edit RepCycle: ", repCycle) }}>
                                        <PencilIcon />
                                </IconButton>
                                <IconButton className="p-2" onClick={deleteClicked}><TrashIcon /></IconButton>
                        </div>
                        <div className="grid grid-cols-2 md:flex md:flex-row ">
                                <RepCycleItem title="Order" value={workoutOrder} />
                                <RepCycleItem title="Equipment" value={equipment} />
                                <RepCycleItem title="Sets" value={numSets} />
                                <RepCycleItem title="Reps" value={numReps} />
                                <RepCycleItem title="Weight" value={weight} />
                                <RepCycleItem title="Rest Time" value={restTime} />
                                <RepCycleItem title="Movement ID" value={movementId} />
                                <RepCycleItem className="grow text-sm col-span-2" title="Coach Notes" value={coachNotes} />

                        </div>

                </CardBack1>
        );
}

function PencilIcon({ className, ...props }) {
        return (
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clipRule="evenodd" />
                </svg>
        );
}

function TrashIcon({ className, ...props }) {
        return (
                <svg {...props} className={`w-6 h-6  ${className}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                </svg>
        );
}

function RepCycleItem({ className, title, value }) {

        return (
                <div className={`text-2xl border-primary-dark last:border-transparent border-2 flex flex-col bg-primary-dark even:bg-primary ${className} px-2`}>
                        <div className="text-sm font-semibold text-nowrap">{title}</div>
                        <div className="align-bottom">{value}</div>
                </div>

        );

}

function RepCycleForm({ day, mode, repCycle, repCycleState }) {

        const dayId = day.dayId;
        const title = mode === "create" ? "Create RepCycle" : "Edit RepCycle";
        const buttonText = mode === "create" ? "Create" : "Save";
        const [repCycles, setRepCycles] = repCycleState;

        if (mode === "edit") {
                // fill in the form with the rep cycle data
                console.log("Editing rep cycle: ", repCycle);
                document.getElementById(`rep-cycle-name-${dayId}`).value = repCycle.repCycleName;
                document.getElementById(`equipment-${dayId}`).value = repCycle.equipment;
                document.getElementById(`num-sets-${dayId}`).value = repCycle.numSets;
                document.getElementById(`num-reps-${dayId}`).value = repCycle.numReps;
                document.getElementById(`weight-${dayId}`).value = repCycle.weight;
                document.getElementById(`rest-time-${dayId}`).value = repCycle.restTime;
                document.getElementById(`coach-notes-${dayId}`).value = repCycle.coachNotes;
                document.getElementById(`workout-order-${dayId}`).value = repCycle.workoutOrder;
                document.getElementById(`movement-id-${dayId}`).value = repCycle.movementId;
        }

        const onSubmit = async (e) => {
                e.preventDefault();
                // get all the form data 
                const dataRaw = new FormData(e.target);
                const data = {
                        repCycleName: dataRaw.get(`rep-cycle-name-${dayId}`),
                        equipment: dataRaw.get(`equipment-${dayId}`),
                        numSets: dataRaw.get(`num-sets-${dayId}`),
                        numReps: dataRaw.get(`num-reps-${dayId}`),
                        weight: dataRaw.get(`weight-${dayId}`),
                        restTime: dataRaw.get(`rest-time-${dayId}`),
                        coachNotes: "",
                        workoutOrder: dataRaw.get(`workout-order-${dayId}`),
                        movementId: dataRaw.get(`movement-id-${dayId}`),
                };
                data.coachNotes = document.getElementById(`coach-notes-${dayId}`).value;
                let cycle = null;

                if (mode === "create") {
                        // create the rep cycle
                        console.log("Creating rep cycle: ", data);
                        const createCycleResponse = await ProgrammingApi.createCycle({ cycleName: data.repCycleName, equipment: data.equipment, numSets: data.numSets, numReps: data.numReps, weight: data.weight, restTime: data.restTime, coachNotes: data.coachNotes, workoutOrder: data.workoutOrder, movementId: data.movementId }).then((r) => {
                                if (r.status === HttpStatus.OK) {
                                        cycle = r.data;
                                        // update day with new rep cycle
                                        const repCycleIds = [...day.repCycles.map((cycle) => cycle.repCycleId), r.data.repCycleId];
                                        const updateDayPayload = {
                                                dayId: day.dayId,
                                                dayName: day.name,
                                                description: "",
                                                cycles: repCycleIds
                                        };
                                        return ProgrammingApi.updateDay(updateDayPayload);
                                } else {
                                        console.error("Error creating rep cycle: ", r.status);
                                }
                        }).catch((error) => {
                                console.error("Error creating rep cycle: ", error);
                        });

                        if (createCycleResponse.status === HttpStatus.OK) {
                                console.log("Rep cycle created: ", createCycleResponse.data);
                                setRepCycles([...repCycles, cycle]);
                        }

                        onClose();
                } else if (mode === "edit") {

                        console.log("Editing rep cycle: ", data);
                        const updateRepCycleResponse = await ProgrammingApi.updateCycle({ repCycleId: repCycle.repCycleId, cycleName: data.name, equipment: data.equipment, numSets: data.numSets, numReps: data.numReps, weight: data.weight, restTime: data.restTime, coachNotes: data.coachNotes, workoutOrder: data.workoutOrder, movementId: data.movementId }).then((r) => {
                                if (r.status === HttpStatus.OK) {
                                        console.log("Rep cycle updated: ", r.data);
                                        return r.data;
                                } else {
                                        console.error("Error updating rep cycle: ", r.status);
                                }
                        }).catch((error) => {
                                console.error("Error updating rep cycle: ", error);
                        });

                        if (updateRepCycleResponse && updateRepCycleResponse.status === HttpStatus.OK) {
                                console.log("Rep cycle updated: ", updateRepCycleResponse.data);
                                const newRepCycles = repCycles.map((cycle) => {
                                        if (cycle.repCycleId === repCycle.repCycleId) {
                                                return updateRepCycleResponse.data;
                                        } else {
                                                return cycle;
                                        }
                                });

                                setRepCycles(newRepCycles);
                                onClose();
                        }

                }
        }

        const onClose = () => {
                const form = document.getElementById(`rep-cycle-form-${dayId}`);
                form.classList.add("hidden");
                // clear form 
                document.getElementById(`rep-cycle-name-${dayId}`).value = "";
                document.getElementById(`equipment-${dayId}`).value = "";
                document.getElementById(`num-sets-${dayId}`).value = "";
                document.getElementById(`num-reps-${dayId}`).value = "";
                document.getElementById(`weight-${dayId}`).value = "";
                document.getElementById(`rest-time-${dayId}`).value = "";
                document.getElementById(`coach-notes-${dayId}`).value = "";
                document.getElementById(`workout-order-${dayId}`).value = "";
                document.getElementById(`movement-id-${dayId}`).value = "";
        }


        // {
        //     "repCycleName": "string",
        //     "equipment": "string",
        //     "numSets": "string",
        //     "numReps": "string",
        //     "weight": "string",
        //     "restTime": "string",
        //     "coachNotes": "string",
        //     "workoutOrder": "string",
        //     "movementId": 0
        // }

        return (
                <BasicModalDialogue title={title} onCloseDialog={onClose} className="hidden" id={`rep-cycle-form-${dayId}`} >
                        <form onSubmit={onSubmit} className="space-y-4 pt-2 ">

                                <LabeledInputField id={`rep-cycle-name-${dayId}`} placeholder="RepCycle Name" required={true} type="text" />
                                <div className="flex flex-row space-x-2">
                                        <LabeledInputField className="flex-1" id={`workout-order-${dayId}`} placeholder="Workout Order" required={true} type="text" />
                                        <LabeledInputField className="flex-1" id={`equipment-${dayId}`} placeholder="Equipment" required={true} type="text" />
                                </div>
                                <div className="flex flex-row w-full space-x-2">
                                        <LabeledInputField className="flex-1" id={`num-sets-${dayId}`} placeholder="Number of Sets" required={true} type="text" />
                                        <LabeledInputField className="flex-1" id={`num-reps-${dayId}`} placeholder="Number of Reps" required={true} type="text" />
                                </div>
                                <div className="flex flex-row space-x-2">
                                        <LabeledInputField className="flex-1" id={`weight-${dayId}`} placeholder="Weight" required={true} type="text" />
                                        <LabeledInputField className="flex-1" id={`rest-time-${dayId}`} placeholder="Rest Time" required={true} type="text" />
                                </div>
                                <LabeledInputField id={`movement-id-${dayId}`} placeholder="Movement ID" required={true} type="number" />

                                {/*TODO: map movement it to movement names and show a dropdown list */}
                                <BasicTextArea id={`coach-notes-${dayId}`} label="Coach Notes" placeholder="Write your notes here..." />
                                <div className="flex justify-end">
                                        <SecondaryButton onClick={onClose} className="mr-2">Cancel</SecondaryButton>
                                        <PrimaryButton type="submit" className="mr-2">{buttonText}</PrimaryButton>
                                </div>
                        </form>
                </BasicModalDialogue>
        );
}
