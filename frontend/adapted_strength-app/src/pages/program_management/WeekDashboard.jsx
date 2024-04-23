import BreadCrumb from "../../components/BreadCrumb";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { CardBack } from "../../components/Card";
import { BasicModalDialogue } from "../../components/Dialog";
import LabeledInputField from "../../components/forms/LabeledInputField";
import { StyledCheckboxTable, CustomTableRow, SearchBar } from "./Tables";
import { HttpStatus } from "../../api/ApiUtils";
import { useNavigate, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import EditBlockDIalog from "./EditBlockDialog";


/**
 * A dasboard that displays all the weeks in a program.
 * @param {Object} props
 * @param {Array} props.breadCrumbState - The state of the breadcrumb component
 */
export default function WeekDashboard({ breadCrumbState, ...props }) {

        const nav = useNavigate();
        const loc = useLocation();
        const url = loc.pathname;
        const [breadcrumb, setBreadcrumb] = breadCrumbState;
        const [weeks, setWeeks] = useState([]);
        const [weekEditId, setWeekEditId] = useState(null);
        const [selectedProgram, setSelectedProgram] = useState(null);

        useEffect(() => {
                ProgrammingApi.getProgram(breadcrumb[0]).then((data) => {
                        setSelectedProgram(data);
                        const weeks = data.weeks.map((week) => {
                                return {
                                        weekId: week.weekId,
                                        name: week.name,
                                        description: "",//week.description.body,
                                        selected: false,
                                        days: week.days
                                };
                        });
                        setWeeks(weeks);
                }).catch((error) => {
                        console.error(`Error getting program ${breadcrumb[0]}: ${error}`);
                });
        }, []);

        const OnWeekClicked = (week) => {
                console.log("Week Clicked clicked: ", week);
                // TODO: add the week to the state and navigate to the week page
                // this way we dont have to fetch the week again from the week page
                nav(`${url}/${week.weekId}`, { relative: true });
        };


        const DeleteWeek = async (weeksToDelete) => {

                let promiseList = [];
                const newWeeks = weeks.filter((week) => !weeksToDelete.includes(week));

                for (const week of weeksToDelete) {
                        console.log(`Deleting program ${week.weekId}`);
                        promiseList.push(ProgrammingApi.deleteWeek(week.weekId).then((r) => {
                                if (r.status === HttpStatus.OK) {
                                        console.log(`Week ${week.weekId} deleted in program ${selectedProgram.programId}`);
                                }
                        }).catch((error) => {
                                console.error('Error deleting week:', error);
                        }));
                }

                await Promise.all(promiseList).then(() => {
                        console.log(`All weeks deleted`);
                });
                setWeeks(newWeeks);
        }

        const OptionSelected = (option) => {
                if (option === 'Delete Selected') {
                        const weeksToDelete = weeks.filter((week) => week.selected);
                        console.log(`Delete Selected, so im deleting ${weeksToDelete.length} weeks`);
                        DeleteWeek(weeksToDelete);
                }
        }

        const onAllSelected = (selected) => {
                console.log(`All selected: ${selected}`);
                const newWeeks = weeks.map((week) => {
                        return { ...week, selected };
                });
                setWeeks(newWeeks);
        }

        const onAddWeek = () => {
                // console.log("Add week");
                // const element = document.getElementById("create-week");
                // // clear the form
                // document.getElementById("week_name_field").value = "";
                // document.getElementById("week_description").value = "";
                // element.classList.remove("hidden");

                const currentWeeks = weeks;
                const weekName = `Week ${currentWeeks.length + 1}`;
                // TODO: Descriptions for weeks implemented
                const weekDescription = `Description for ${weekName}`;
                onCreateWeek(weekName, weekDescription);
        }

        const onCreateWeek = async (weekName, weekDescription) => {

                let week = null;

                try {
                        const createWeekResponse = await ProgrammingApi.createWeek({ weekName, weekDescription }).then((response) => {
                                if (response.status === HttpStatus.OK) {
                                        console.log("Week created: ", response.data);
                                        const newWeek = {
                                                weekId: response.data.weekId,
                                                name: response.data.name,
                                                description: response.data?.description?.body || "",
                                                selected: false
                                        }
                                        // update the program with the new week
                                        const updateProgramPayload = {
                                                programId: selectedProgram.programId,
                                                name: selectedProgram.name,
                                                description: selectedProgram.description.body,
                                                weekIds: [...selectedProgram.weeks.map((week) => week.weekId), response.data.weekId]
                                        };
                                        console.log("Update program payload: ", updateProgramPayload);
                                        week = newWeek;
                                        return ProgrammingApi.updateProgram(updateProgramPayload);
                                } else {
                                        throw new Error(`Error creating week: ${response.status}`);
                                }
                        });
                        if (createWeekResponse.status === HttpStatus.OK) {
                                console.log("Program updated with new week: ", createWeekResponse.data);
                                setSelectedProgram(createWeekResponse.data);
                                setWeeks([...weeks, week]);
                        } else {
                                throw new Error(`Error updating program: ${createWeekResponse.status}`);
                        }
                } catch (e) {
                        console.error('Error creating program:', e);
                }

                document.getElementById("create-week").classList.add("hidden");
        }

        const DuplicateWeek = async (week) => {
                try {
                        const newWeekResponse = await ProgrammingApi.duplicateWeek(week);

                        if (newWeekResponse) {
                                // add (Duplicate) to the name 
                                const newWeek = {
                                        id: newWeekResponse.weekId,
                                        name: `${newWeekResponse.name} (Duplicate)`,
                                        description: "",
                                        selected: false,
                                        days: newWeekResponse.days
                                };
                                const updatedNewWeekResponse = await ProgrammingApi.updateWeek({ weekId: newWeek.id, weekName: newWeek.name, description: newWeek.description, dayIds: newWeek.days.map((day) => day.dayId) }).then((response) => {
                                        // update the program
                                        const updateProgramPayload = {
                                                programId: selectedProgram.programId,
                                                name: selectedProgram.name,
                                                description: selectedProgram.description.body,
                                                weekIds: [...selectedProgram.weeks.map((week) => week.weekId), newWeek.id]
                                        };
                                        console.log("Update program payload: ", updateProgramPayload);
                                        return ProgrammingApi.updateProgram(updateProgramPayload);

                                });

                                if (updatedNewWeekResponse.status === HttpStatus.OK) {
                                        console.log("Week duplicated: ", updatedNewWeekResponse.data);
                                        setWeeks([...weeks, newWeek]);
                                } else {
                                        throw new Error(`Error updating week: ${updatedNewWeekResponse.status}`);
                                }
                        }

                } catch (e) {
                        console.error('Error duplicating week:', e);
                }

        };

        return (selectedProgram &&

                <div className="flex flex-col px-6">
                        <CreateWeekDialog className="hidden" title="Create Week" id="create-week" onClose={() => { document.getElementById("create-week").classList.add("hidden") }} onSubmit={onCreateWeek} />

                        <BreadCrumb first={{ name: "Programs", to: "/program-management" }} breadCrumbs={[
                                { name: selectedProgram.name, to: `/program-management/${selectedProgram.id}` },
                        ]} />
                        <CardBack className="">
                                <div className="flex flex-col sm:flex-row mt-2">
                                        <SearchBar />
                                        <PrimaryButton
                                                className="sm:ml-auto w-32"
                                                onClick={onAddWeek}>
                                                Add Week
                                        </PrimaryButton>
                                </div>
                                <StyledCheckboxTable headers={["Name", "Description"]} onAllSelected={onAllSelected} onOptionsClick={OptionSelected}>
                                        {weeks.map((week) => (
                                                <CustomTableRow
                                                        key={week.weekId}
                                                        data={[
                                                                week.name,
                                                                week.description,
                                                        ]}
                                                        onOptionClick={(option) => {
                                                                if (option === 'Delete') {
                                                                        DeleteWeek([week]);
                                                                } else if (option === 'Edit') {
                                                                        document.getElementById("edit-week").classList.remove("hidden");
                                                                        setWeekEditId(week.weekId);
                                                                        console.log(`Edit week ${JSON.stringify(week)}`);
                                                                } else if (option === 'Duplicate') {
                                                                        DuplicateWeek(week);
                                                                }
                                                        }}
                                                        selected={week.selected}
                                                        onRowClick={() => OnWeekClicked(week)}
                                                        onClick={() => {
                                                                const newWeeks = weeks.map((b) => {
                                                                        if (b.weekId === week.weekId) {
                                                                                return { ...b, selected: !b.selected };
                                                                        }
                                                                        return b;
                                                                });
                                                                setWeeks(newWeeks);
                                                                console.log(`Week ${week.weekId} selected: ${week.selected}`);
                                                        }}
                                                />
                                        ))}
                                </StyledCheckboxTable>
                        </CardBack>
                        <EditBlockDIalog blockId={weekEditId} blockState={[weeks, setWeeks]} id="edit-week" className="hidden" title="Edit Week" onClose={() => { document.getElementById("edit-week").classList.add("hidden") }} />

                </div>
        );
}


function CreateWeekDialog({ className, onSubmit, ...props }) {

        const onCreate = (e) => {
                e.preventDefault();
                // get all the form data 
                const dataRaw = new FormData(e.target);
                const data = {
                        name: dataRaw.get("week_name_field"),
                        description: dataRaw.get("week_description")
                };

                onSubmit(data);
        }

        return (
                <BasicModalDialogue title={props.title} className={className} onCloseDialog={props.onClose} {...props}>
                        <form onSubmit={onCreate}>
                                <LabeledInputField id="week_name_field" placeholder="Week Name" required={true} />
                                <div className="py-5">
                                        <label htmlFor="week_description" className="block mb-2 text-sm font-medium text-gray-900 ">Week Description</label>
                                        <textarea id="week_description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Describe this week here..."></textarea>
                                </div>
                                <div className="flex justify-end">
                                        <SecondaryButton onClick={props.onClose} className="mr-2">Cancel</SecondaryButton>
                                        <PrimaryButton type="submit" className="mr-2">Create</PrimaryButton>
                                </div>
                        </form>
                </BasicModalDialogue>
        );
}
