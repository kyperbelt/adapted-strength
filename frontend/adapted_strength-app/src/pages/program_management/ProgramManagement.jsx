import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { CardBack } from "../../components/Card";
import { StyledCheckboxTable, CustomTableRow, SearchBar } from "./Tables";
import { useState } from "react";
import { BlankPageContainer } from "../../components/PageContainer";
import ProgramDashboard from "./ProgramDashboard";
import CreateProgramDialog from "./CreateProgramDialog";
import EditProgramsDialog from "./EditProgramDialog";

// list of programs 
const test_programs = [
  {
    id: 1,
    name: "Program 1",
    description: "This is a program",
    selected: false,
    blocks: []
  },
  {
    id: 2,
    name: "Program 2",
    description: "This is a program",
    selected: false,
    blocks: []
  },
  {
    id: 3,
    name: "Program 3",
    description: "This is a program",
    selected: false,
    blocks: [1]
  },
  {
    id: 4,
    name: "Program 4",
    description: "This is a program",
    selected: false,
    blocks: []
  },
];


const test_blocks = [
  {
    id: 1,
    name: "Block 1",
    description: "This is a block",
    weeks: [1, 2]
  },
  {
    id: 2,
    name: "Block 2",
    description: "This is a block",
    weeks: [1, 1, 1]
  },
  {
    id: 3,
    name: "Block 3",
    description: "This is a block",
    weeks: [1, 1, 2, 3, 1]
  },
]

const test_weeks = [
  {
    id: 1,
    name: "Week 1",
    description: "This is a week",
    days: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    id: 2,
    name: "Week 2",
    description: "This is a week",
    days: []
  },
  {
    id: 3,
    name: "Week 3",
    description: "This is a week",
    days: []
  },
]

const test_days = [
  {
    id: 1,
    name: "Day 1",
    cycles: [1, 2, 1]
  },
  {
    id: 2,
    name: "Day 2",
    cycles: []
  },
  {
    id: 3,
    name: "Day 3",
    cycles: []
  },
  {
    id: 4,
    name: "Day 4",
    cycles: []
  },
  {
    id: 5,
    name: "Day 5",
    cycles: []
  },
  {
    id: 6,
    name: "Day 6",
    cycles: []
  },
  {
    id: 7,
    name: "Day 7",
    cycles: []
  },
]

const test_cycles = [
  {
    id: 1,
    name: "Cycle 1",
    equipment: "Bike",
    num_of_sets: 3,
    num_of_reps: 10,
    weight: 100,
    rest_time: 60,
    coach_notes: "This is a note that is kind of long",
  },
  {
    id: 2,
    name: "Cycle 2",
    equipment: "Squat Rack",
    num_of_sets: 3,
    num_of_reps: 10,
    weight: 100,
    rest_time: 60,
    coach_notes: "This is a note",
  },
]


let program_id = 5;


export default function ProgramMamagement() {

  const [programs, setPrograms] = useState(test_programs);

  const onAddProgram = () => {
    console.log("Add program");
    const element = document.getElementById("create-program");
    element.classList.remove("hidden");
  }

  const onCreateProgramClose = () => {
    console.log("Close program");
    const element = document.getElementById("create-program");
    element.classList.add("hidden");
  }

  const onCreate = (name, description) => {
    // TODO: request to create a program
    const newProgram = {
      id: program_id++,
      name: name,
      description: description,
      selected: false,
      blocks: []
    };
    setPrograms([...programs, newProgram]);
  };

  return (
    <BlankPageContainer id="program-management">
      {/*Dialogs*/}
      <CreateProgramDialog onCreate={onCreate} id="create-program" className="hidden" title="Create Program" onClose={onCreateProgramClose} />
      <ProgramDashboard trainingPrograms={[programs, setPrograms]} onAddProgram={onAddProgram} />
    </BlankPageContainer>
  );
}
