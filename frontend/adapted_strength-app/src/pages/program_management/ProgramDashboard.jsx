import BreadCrumb from "../../components/BreadCrumb";
import { useNavigate, useLocation } from "react-router-dom";
import CreateProgramDialog from "./CreateProgramDialog";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { CardBack } from "../../components/Card";
import EditProgramsDialog from "./EditProgramDialog";
import { ProgrammingApi } from "../../api/ProgrammingApi";
import { HttpStatus } from "../../api/ApiUtils";
import { StyledCheckboxTable, CustomTableRow, SearchBar } from "./Tables";

import { useState, useEffect, useRef } from "react";
import { levenshteinDistance } from "../../util/search";

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

function getFilteredPrograms(programs, searchText) {
  if (!searchText || searchText === "") {
    return programs;
  }
  return programs.filter((program) => {
    return program.name.toLowerCase().includes(searchText.toLowerCase()) || program.description.toLowerCase().includes(searchText.toLowerCase()) || levenshteinDistance(program.name, searchText) < 3 || levenshteinDistance(program.description, searchText) < 3;
  });
}


export default function ProgramDashboard({ breadCrumbState, ...props }) {
  const nav = useNavigate();
  const loc = useLocation();
  const url = loc.pathname;
  const [breadcrumb, setBreadcrumb] = breadCrumbState;
  const [programs, setPrograms] = useState([]);
  const [programEditId, setEditProgramId] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Fetch programs on first render once and update the state
  const programsFetched = useRef(false);
  useEffect(() => {
    if (!programsFetched.current) {
      programsFetched.current = true;
      getAllPrograms().then((data) => {
        setPrograms(data);
      }).catch((_error) => {
        programsFetched.current = false;
        // TODO: retry to fetch programs
      });
    }
  }, []);

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

    try {
      const createProgramResponse = await ProgrammingApi.createProgram({ name, description });
      console.log("Create program response: ", createProgramResponse);
      if (createProgramResponse.status === HttpStatus.OK) {
        const programData = createProgramResponse.data;
        const newProgram = {
          id: programData.programId,
          name: programData.name,
          description: programData.description.body,
          selected: false,
          weeks: programData.weeks
        };
        console.log("Program created: ", newProgram);
        setPrograms([...programs, newProgram]);
      } else {
        console.error("Error creating program: ", name);
      }
    } catch (e) {
      console.error('Error creating program:', e);
    }

    // await getAllPrograms().then((data) => {
    //   // match all programs to new programs and keep selected state if any 
    //   const newPrograms = data.map((program) => {
    //     const matchedProgram = programs.find((p) => p.id === program.id);
    //     if (matchedProgram) {
    //       return {
    //         ...program,
    //         selected: matchedProgram.selected
    //       };
    //     }
    //     return program;
    //   });
    //   // setting new programs
    //   console.log("New programs: ", newPrograms);
    //   setPrograms(newPrograms);
    // });

  };

  const onClickProgram = (program) => {
    console.log("Program clicked: ", program);
    // TODO: add the program to the state and navigate to the program page
    // this way we dont have to fetch the program again from the week page
    nav(`${url}/${program.id}`, { relative : true });
    
  }


  const DeleteProgram = async (programsToDelete) => {

    let promiseList = [];

    for (const program of programsToDelete) {
      console.log(`Deleting program ${program.id}`);
      promiseList.push(ProgrammingApi.deleteProgram(program.id).then((r) => {
        if (r.status === HttpStatus.OK) {
          console.log(`Program ${program.id} deleted`);
        }
      }).catch((error) => {
        console.error('Error deleting program:', error);
      }));
    }

    await Promise.all(promiseList).then(() => {
      console.log(`All programs deleted`);
    });

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

  const onSearch = (text) =>{
    console.log("Searching for: ", text);
    setSearchText(text);
  };


      // <h3 className="text-3xl font-bold text-secondary-light">Programs</h3>
  return (

    <div className="flex flex-col px-6" {...props}>

      {/*Dialogs*/}
      <CreateProgramDialog onCreate={onCreate} id="create-program" className="hidden" title="Create Program" onClose={onCreateProgramClose} />

      <BreadCrumb first={{name: "Programs", to: "/program-management"}} breadCrumbs={breadcrumb}/>
      <CardBack className="">
        <div className="flex flex-col sm:flex-row mt-2">

          <SearchBar onSearch={onSearch} />
          <PrimaryButton
            className="sm:ml-auto w-32"
            onClick={onAddProgram}>
            Add Program
          </PrimaryButton>
        </div>
        <StyledCheckboxTable headers={["Name", "Description"]} onAllSelected={onAllSelected} onOptionsClick={OptionSelected}>
          {getFilteredPrograms(programs,searchText).map((program) => (
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
      <EditProgramsDialog programId={programEditId} programState={[programs, setPrograms]} id="edit-program" className="hidden" title="EditrProgram" onClose={() => { document.getElementById("edit-program").classList.add("hidden") }} />
    </div>
  );
}
