import BreadCrumb from "../../components/BreadCrumb";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { CardBack } from "../../components/Card";
import { BasicModalDialogue } from "../../components/Dialog";
import LabeledInputField from "../../components/forms/LabeledInputField";
import { StyledCheckboxTable, CustomTableRow, SearchBar } from "./Tables";
import { HttpStatus } from "../../api/ApiUtils";

import { useState, useEffect } from "react";
import EditBlockDIalog from "./EditBlockDialog";


export default function WeekDashboard({ breadCrumbState, ...props }) {

        const [breadcrumb, setBreadcrumb] = breadCrumbState;
        const [weeks, setWeeks] = useState([]);
        const [weekEditId, setWeekEditId] = useState(null);
        const [selectedProgram, setSelectedProgram] = useState(null);

        useEffect(() => {
                ProgrammingApi.getProgram(breadcrumb[0]).then((data) => {
                        setSelectedProgram(data);
                        setWeeks(data.weeks);
                }).catch((error) => {
                        console.error(`Error getting program ${breadcrumb[0]}: ${error}`);
                });
        }, []);

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
                console.log("Add week");
                const element = document.getElementById("create-week");
                // clear the form
                document.getElementById("week_name_field").value = "";
                document.getElementById("week_description").value = "";
                element.classList.remove("hidden");
        }

        const onCreateWeek = async (data) => {
                const newWeek = {
                        name: data.name,
                        description: data.description,
                        selected: false
                };

                try {
                        const createWeekResponse = await ProgrammingApi.createWeek({ weekName: newWeek.name, weekDescription: newWeek.description, programId: selectedProgram.id }).then((response) => {
                                if (response.status === HttpStatus.OK) {
                                        console.log("Week created: ", response.data);
                                        // update the program with the new week
                                        const updateProgramPayload = {
                                                programId: selectedProgram.programId,
                                                name: selectedProgram.name,
                                                description: selectedProgram.description.body,
                                                weekIds: [...selectedProgram.weeks.map((week) => week.weekId), response.data.weekId]
                                        };
                                        console.log("Update program payload: ", updateProgramPayload);
                                        return ProgrammingApi.updateProgram(updateProgramPayload);
                                } else {
                                        throw new Error(`Error creating week: ${response.status}`);
                                }
                        });
                        if (createWeekResponse.status === HttpStatus.OK) {
                                console.log("Program updated with new week: ", createWeekResponse.data);
                                setSelectedProgram(createWeekResponse.data);
                        } else {
                                throw new Error(`Error updating program: ${createWeekResponse.status}`);
                        }
                } catch (e) {
                        console.error('Error creating program:', e);
                }

                setWeeks([...weeks, newWeek]);
                document.getElementById("create-week").classList.add("hidden");
        }

        return (selectedProgram &&

                <div className="flex flex-col px-6">
                        <CreateWeekDialog className="hidden" title="Create Week" id="create-week" onClose={() => { document.getElementById("create-week").classList.add("hidden") }} onSubmit={onCreateWeek} />

                        <BreadCrumb first={{ name: "Projects", to: "/program-management" }} breadCrumbs={[
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
                                                                        document.getElementById("edit-block").classList.remove("hidden");
                                                                        setWeekEditId(week.weekId);
                                                                }
                                                        }}
                                                        selected={week.selected}
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
                        <EditBlockDIalog blockId={weekEditId} blockState={[weeks, setWeeks]} id="edit-week" className="hidden" title="Edit Block" onClose={() => { document.getElementById("edit-block").classList.add("hidden") }} />

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
