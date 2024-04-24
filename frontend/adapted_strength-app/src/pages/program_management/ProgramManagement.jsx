<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import { BlankPageContainer } from "../../components/PageContainer";
import ProgramDashboard from "./ProgramDashboard";
import WeekDashboard from "./WeekDashboard";
import DayDashboard from "./DayDashboard";
import { useNavigate, useLocation, useParams } from "react-router-dom";
=======
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { CardBack } from "../../components/Card";
import { StyledCheckboxTable, CustomTableRow, SearchBar } from "./Tables";
import { useState } from "react";
import { BlankPageContainer } from "../../components/PageContainer";
import ProgramDashboard from "./ProgramDashboard";
import CreateProgramDialog from "./CreateProgramDialog";
import EditProgramsDialog from "./EditProgramDialog";
import BlockDashboard from "./BlockDashboard";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { HttpStatus } from "../../api/ApiUtils";
>>>>>>> program_management_redo


// PROGRAM FORMAT for local web state
// id: program_id++,
// name: name,
// description: description,
// selected: false,
// blocks: []

<<<<<<< HEAD

export default function ProgramMamagement() {

  const location = useLocation();
  // get path variables 
  const { programId, weekId, dayId } = useParams();
  let breadcrumbPreload = [];
  if (programId) {
    breadcrumbPreload.push(programId);
  }
  if (weekId) {
    breadcrumbPreload.push(weekId);
  }
  if (dayId) {
    breadcrumbPreload.push(dayId);
  }
  const [breadcrumb, setBreadcrumb] = useState(breadcrumbPreload);

  useEffect(() => {
    let breadcrumbPreload = [];
    if (programId) {
      breadcrumbPreload.push(programId);
    }
    if (weekId) {
      breadcrumbPreload.push(weekId);
    }
    if (dayId) {
      breadcrumbPreload.push(dayId);
    }
    setBreadcrumb(breadcrumbPreload);
    console.log("breadcrumbPreload", breadcrumbPreload);
  }, [location]);



  return (
    <BlankPageContainer id="program-management">
      {breadcrumb.length <= 0 && <ProgramDashboard breadCrumbState={[breadcrumb, setBreadcrumb]} />}
      {breadcrumb.length == 1 && <WeekDashboard breadCrumbState={[breadcrumb, setBreadcrumb]} />}
      {breadcrumb.length == 2 && <DayDashboard breadCrumbState={[breadcrumb, setBreadcrumb]} />}
=======
function getCyclesForDay(day_id) {
  //TODO: request to get cycles for a day from the server

}

function getDaysForWeek(week_id) {
  //TODO: request to get days for a week from the server

}

function getWeeksForBlock(block_id) {
  //TODO: request to get weeks for a block from the server 

}

function getBlocksForProgram(program_id) {
  // TODO: request to get blocks for a program from the server 
}

function getAllPrograms() {
  try {
    return ProgrammingApi.getAllPrograms().then((data) => {
      // cleanse data, only return in formated program structure 
      const programs = data.map((program) => {
        return {
          id: program.programId,
          name: program.name,
          description: "no description saved yet",
          selected: false,
          // map array of week objects to just an array of week ids
          blocks: program.weeks.map((block) => block.weekId)
        };
      });
      return programs;
    });
  } catch (e) {
    console.error('Error getting all programs:', e);
  }
}


let program_id = 5;


export default function ProgramMamagement() {

  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedProgramBlocks, setSelectedProgramBlocks] = useState([]);

  


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

  const onCreate = async (name, description) => {
    // TODO: request to create a program
    const newProgram = {
      name: name,
      description: description,
    };


    try {
      const createProgramResponse = await ProgrammingApi.createProgram(newProgram);
      console.log("Create program response: ", createProgramResponse);
      if (createProgramResponse.status === HttpStatus.OK) {
        console.log("Program created: ", newProgram);
      }else{
        console.error("Error creating program: ", newProgram);
      }
    } catch (e) {
      console.error('Error creating program:', e);
    }

    await getAllPrograms().then((data) => {
      // match all programs to new programs and keep selected state if any 
      const newPrograms = data.map((program) => {
        const matchedProgram = programs.find((p) => p.id === program.id);
        if (matchedProgram) {
          return {
            ...program,
            selected: matchedProgram.selected
          };
        }
        return program;
      });
      // setting new programs
      console.log("New programs: ", newPrograms);
      setPrograms(newPrograms);
    });

  };

  const onClickProgram = (program) => {
    console.log("Program clicked: ", program);
    // get blocks for the program
    // const selectedProgramBlocks = test_blocks.filter((block) => program.blocks.includes(block.id));
    // setSelectedProgramBlocks(selectedProgramBlocks);
    // setSelectedProgram(program);
  }

  return (
    <BlankPageContainer id="program-management">
      {/*Dialogs*/}
      <CreateProgramDialog onCreate={onCreate} id="create-program" className="hidden" title="Create Program" onClose={onCreateProgramClose} />
      {!selectedProgram && <ProgramDashboard onClickProgram={onClickProgram} trainingPrograms={[programs, setPrograms]} onAddProgram={onAddProgram} />}
      {selectedProgram && <BlockDashboard programBlocks={[selectedProgramBlocks, setSelectedProgramBlocks]} />}
>>>>>>> program_management_redo
    </BlankPageContainer>
  );
}
