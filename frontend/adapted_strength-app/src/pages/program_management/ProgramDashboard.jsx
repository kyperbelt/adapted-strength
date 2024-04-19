import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { CardBack } from "../../components/Card";
import EditProgramsDialog from "./EditProgramDialog";
import { StyledCheckboxTable, CustomTableRow, SearchBar } from "./Tables";

import { useState } from "react";

export default function ProgramDashboard({ trainingPrograms, onAddProgram, onClickProgram, ...props }) {
  const [programs, setPrograms] = trainingPrograms;
  const [programEditId, setEditProgramId] = useState(null);


  const DeleteProgram = (programsToDelete) => {

    const newPrograms = programs.filter((program) => !programsToDelete.includes(program));
    setPrograms(newPrograms);
  }

  const OptionSelected = (option) => {
    if (option === 'Delete Selected') {
      const programsToDelete = programs.filter((program) => program.selected);
      console.log(`Delete Selected so im deleting ${programsToDelete.length} programs`);
      DeleteProgram(programsToDelete);
    }
  }

  const onAllSelected = (selected) => {
    console.log(`All selected: ${selected}`);
    const newPrograms = programs.map((program) => {
      return { ...program, selected };
    });
    setPrograms(newPrograms);
  }

  const OnProgramClicked = (program) => {
    console.log(`Program ${program.id} selected: ${program.selected}`);
    onClickProgram(program);
  }

  return (

    <div className="flex flex-col px-6" {...props}>
      <h3 className="text-3xl font-bold text-secondary-light">Programs</h3>
      <CardBack className="">
        <div className="flex flex-col sm:flex-row mt-2">

          <SearchBar />
          <PrimaryButton
            className="sm:ml-auto w-32"
            onClick={onAddProgram}>
            Add Program
          </PrimaryButton>
        </div>
        <StyledCheckboxTable headers={["Name", "Description"]} onAllSelected={onAllSelected} onOptionsClick={OptionSelected}>
          {programs.map((program) => (
            <CustomTableRow
              key={program.id}
              data={[
                program.name,
                program.description,
              ]}
              onOptionClick={(option) => {
                if (option === 'Delete') {
                  DeleteProgram([program]);
                } else if (option === 'Edit') {
                  document.getElementById("edit-program").classList.remove("hidden");
                  setEditProgramId(program.id);
                }
              }}
              selected={program.selected}
              onClick={() => {
                const newPrograms = programs.map((p) => {
                  if (p.id === program.id) {
                    return { ...p, selected: !p.selected };
                  }
                  return p;
                });
                setPrograms(newPrograms);
                console.log(`Program ${program.id} clicked`);
              }}
              onRowClick={() => OnProgramClicked(program)}
            />
          ))}
        </StyledCheckboxTable>
      </CardBack>
      <EditProgramsDialog programId={programEditId} programState={[programs, setPrograms]} id="edit-program" className="hidden" title="Edit Program" onClose={() => { document.getElementById("edit-program").classList.add("hidden") }} />
    </div>
  );
}
