import { BasicModalDialogue } from "../../components/Dialog";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { useState, useEffect, useContext } from "react";
import {PageContainer2} from "../../components/PageContainer";
import { CardBack } from "../../components/Card";
import LabeledInputField from "../../components/forms/LabeledInputField";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCurrentPath } from "../../util/ReactHooks";
import ManagementMenu from "./ManagementMenu";
import HamburgerButton from "./HamburgerButton";

// list of programs 
const test_programs = [
  {
    id: 1,
    name: "Program 1",
    description: "This is a program",
    open: false,
    selected: false,
    blocks: []
  },
  {
    id: 2,
    name: "Program 2",
    description: "This is a program",
    open: false,
    selected: false,
    blocks: []
  },
  {
    id: 3,
    name: "Program 3",
    description: "This is a program",
    open: false,
    selected: false,
    blocks: [1]
  },
  {
    id: 4,
    name: "Program 4",
    description: "This is a program",
    open: true,
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

const VIEW_TYPE_DASHBOARD = "dashboard";
const VIEW_TYPE_PROGRAM = "program";
const VIEW_TYPE_BLOCK = "block";
const VIEW_TYPE_WEEK = "week";
const VIEW_TYPE_DAY = "day";

function getViewType({ programId, blockId, weekId, dayId }) {
  if (programId && blockId && weekId && dayId ) {
    return VIEW_TYPE_DAY;
  }else if (programId && blockId && weekId) {
    return VIEW_TYPE_WEEK;
  } else if (programId && blockId) {
    return VIEW_TYPE_BLOCK;
  } else if (programId) {
    return VIEW_TYPE_PROGRAM;
  } else {
    return VIEW_TYPE_DASHBOARD;
  }
}

function animationLeft({ lastView, newView }) {
  console.log(`lastView: ${lastView}, newView: ${newView}`);
  if (lastView === VIEW_TYPE_DASHBOARD && newView === VIEW_TYPE_PROGRAM) {
    return true;
  } else if (lastView === VIEW_TYPE_PROGRAM && newView === VIEW_TYPE_BLOCK) {
    return true;
  } else {
    return false;
  }
}

export default function ProgramMamagement() {
  const [programs, setPrograms] = useState(test_programs);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { programId, blockId, weekId, dayId} = useParams();
  const viewType = getViewType({ programId, blockId, weekId, dayId});
  const lastView = state?.lastView ?? VIEW_TYPE_DASHBOARD;
  const animLeft = animationLeft({ lastView: lastView, newView: viewType });
  console.log(`programId: ${programId}, blockId: ${blockId}`);

  const historyManager = {
    push: (value) => {
      navigate(`${value}`, { state: { lastView: viewType } });
    },
    pop: () => {
      navigate(-1, { state: { lastView: viewType } });
    },
  };

  const menuSelected = (menuItem) => {
    console.log(`menu selected: ${menuItem}`);
  }

  return (
    <PageContainer2>
      <ManagementMenu selectedDefault={"Programs"} onSelect={menuSelected} />
      <div className="flex flex-row">
        <CardBack className={`xl:w-11/12 xl:mx-auto w-full ${animLeft ? 'animate-slideLeft' : 'animate-slideRight'}`}>
          {viewType === VIEW_TYPE_DASHBOARD && <ProgrammingDashboardView programState={[programs, setPrograms]} historyManager={historyManager} />}
          {viewType === VIEW_TYPE_PROGRAM && <ProgramView program_id={programId} historyManager={historyManager} />}
          {viewType === VIEW_TYPE_BLOCK && <BlockView block_id={blockId} historyManager={historyManager} />}
          {viewType === VIEW_TYPE_WEEK && <WeekView week_id={weekId} historyManager={historyManager} />}
          {viewType === VIEW_TYPE_DAY && <DayView day_id={dayId} historyManager={historyManager} />}
        </CardBack>
      </div>
    </PageContainer2>
  );
}

function ProgrammingDashboardView({ programState, historyManager, ...props }) {
  const [programs, setPrograms] = programState;

  const onRowClick = (program) => {
    for (let p of programs) {
      if (p.name === program.name) {
        p.open = !p.open;
      } else {
        p.open = false;
      }
    }
    setPrograms([...programs]);
    console.log(`clicked on ${program.name}`)
    historyManager.push(`${program.id}`, VIEW_TYPE_PROGRAM);
  }

  const onAllCheckedOrUnchecked = (e) => {
    for (let p of programs) {
      p.selected = e.target.checked;
    }
    setPrograms([...programs]);
    console.log(`${e.target.checked ? "checked" : "unchecked"} all`)
  }

  const programSelectedOrUnselected = (program, e) => {
    for (let p of programs) {
      if (p.name === program.name) {
        p.selected = e.target.checked;
      }
    }
    setPrograms([...programs]);
    console.log(`${e.target.checked ? "checked" : "unchecked"} ${e.target.name}`)
  }


  return (
    <div {...props}>
      <div className="relative p-4 flex flex-row rounded-xl xl col-span-2">
        <div className="mt-3 text-black font-bold" >Programs</div>
        <LabeledInputField className="ml-auto" placeholder="search" />
        <PrimaryButton className="ml-2" >Add Program</PrimaryButton>
      </div>
      <StyledCheckboxTable headers={["Name", "Description"]} onAllCheckedOrUnchecked={onAllCheckedOrUnchecked}>
        {programs.map((program) => (
          <CustomTableRow key={program.name} selectedOrUnselected={(e) => programSelectedOrUnselected(program, e)} onRowClick={(e) => { onRowClick(program) }} onOptions={(e) => { console.log(`not working yet`) }} checked={program.selected}>
            <td className="px-6 py-3"> {program.name} </td>
            <td className="px-6 py-3"> {program.description} </td>
          </CustomTableRow>
        ))}
      </StyledCheckboxTable>
      <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="" type="button" >sup</button>
    </div>
  );
}

function StyledCheckboxTable({ ...props }) {
  const headers = props.headers;
  const children = props.children;

  return (
    <table className={`w-full mt-4 ${props.className}`}>
      <thead>
        <tr className="border-b" key="headers">
          <th className="w-1 px-6">
            <input type="checkbox" onChange={props.onAllCheckedOrUnchecked} />
          </th>
          {headers.map((header) => {
            return (<th className="px-6 py-3 text-left font-bold">{header}</th>);
          })}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
}

function ProgramView({ historyManager, program_id }) {
  // const [blocks, setBlocks] = useState(test_blocks);
  const blocks = test_blocks;
  console.log(`program_id: ${program_id}`);

  const program = test_programs.filter((p) => p.id == program_id)[0];

  return (
    <div>
      <SecondaryPageHeader title={`Program: ${program.name}`} historyManager={historyManager} buttonName="Add Block" />
      <StyledCheckboxTable headers={["ID", "Name", "Description"]} onAllCheckedOrUnchecked={(e) => { console.log(`not working yet`) }}>
        {program.blocks.map((block_id) => {
          const block = blocks.filter((b) => b.id === block_id)[0];
          return (
            <CustomTableRow key={block.name} selectedOrUnselected={(e) => { console.log(`not working yet`) }} onRowClick={(e) => { historyManager.push(`${block.id}`) }} onOptions={(e) => { console.log(`not working yet`) }} checked={block.selected}>
              <td className="px-6 py-3 border-l"> {block.id} </td>
              <td className="px-6 py-3 border-l"> {block.name} </td>
              <td className="px-6 py-3 border-l"> {block.description}</td>
            </CustomTableRow>
          );
        })}
      </StyledCheckboxTable>
    </div>
  );
}

function BlockView({ historyManager, block_id }) {
  const [block, setBlock] = useState(test_blocks.filter((b) => b.id == block_id)[0]);


  return (
    <div>
      <SecondaryPageHeader title={block.name} historyManager={historyManager} buttonName="Add Week" />

      <StyledCheckboxTable headers={["Week", "Day"]} onAllCheckedOrUnchecked={(e) => { console.log(`not working yet`) }}>
        {block.weeks.map((week_id) => {
          const week = test_weeks.filter((w) => w.id === week_id)[0];
          return (
            <CustomTableRow key={week_id} selectedOrUnselected={(e) => { console.log(`not working yet`) }} onRowClick={(e) => { historyManager.push(`${week_id}`) }} onOptions={(e) => { console.log(`not working yet`) }} checked={false}>
              <td className="px-6 py-3 border-l"> {week.name} </td>
              <td className="px-6 py-3 border-l"> {week.days.length} </td>
            </CustomTableRow>
          );
        })}
      </StyledCheckboxTable>
    </div>
  );
}

function WeekView({ historyManager, week_id }) {
  const week = test_weeks.filter((w) => w.id == week_id)[0];
  return (
    <div>
      <SecondaryPageHeader title={`Week: ${week_id}`} historyManager={historyManager} buttonName="Add Day" />
      <StyledCheckboxTable className="w-full" headers={["Day"]} onAllCheckedOrUnchecked={(e) => { console.log(`not working yet`) }}>
        {week.days.map((day_id) => {
          const day = test_days.filter((d) => d.id === day_id)[0];
          return (
            <CustomTableRow key={day_id} selectedOrUnselected={(e) => { console.log(`not working yet`) }} onRowClick={(e) => { historyManager.push(`${day_id}`) }} onOptions={(e) => { console.log(`not working yet`) }} checked={false}>
              <td className="px-6 py-3 border-l"> {day.name} </td>
            </CustomTableRow> 
           );
        })}
      </StyledCheckboxTable>
    </div>

  );
}

function DayView({ historyManager, day_id }) {
  const day = test_days.filter((d) => d.id == day_id)[0];
  return (
    <div>
      <SecondaryPageHeader title={day.name} historyManager={historyManager} buttonName="Add Cycle" />
      <StyledCheckboxTable headers={["Cycle"]} onAllCheckedOrUnchecked={(e) => { console.log(`not working yet`) }}>
        {day.cycles.map((cycle_id) => {
          const cycle = test_cycles.filter((c) => c.id === cycle_id)[0];
          return (
            <CustomTableRow key={cycle_id} selectedOrUnselected={(e) => { console.log(`not working yet`) }} onRowClick={(e) => { historyManager.push(`${cycle_id}`) }} onOptions={(e) => { console.log(`not working yet`) }} checked={false}>
              <td className="px-6 py-3 border-l">
                <Cycle cycle_id={cycle_id} />
              </td>
            </CustomTableRow>
          );
        })}
      </StyledCheckboxTable>
    </div>
  );
}

function CustomTableRow({ selectedOrUnselected, onRowClick, onOptions, ...props }) {

  return (
    <tr className="border-b text-left hover:bg-gray-300 hover:cursor-pointer" onClick={onRowClick}>
      <td className="px-6 py-3">
        <input type="checkbox" onClick={(e) => { e.stopPropagation() }} onChange={selectedOrUnselected} checked={props.checked} />
      </td>
      {props.children}
      <td><HamburgerButton className="ml-auto" dropdownToggle={"dropdown"} onClick={(e) => { e.stopPropagation(); onOptions(e); }} /> </td>
    </tr>
  );
}

function Block({ block }) {
  return (
    <div className="w-full mt-2 p-4 border border-black  rounded-xl">
      <div className="flex flex-row">
        <div className="ml-2">{block.name}</div>
      </div>
      <div className="flex flex-col">
        {(block.weeks.map((week) => {
          return (<Week week_id={week} />);
        }))}
      </div>
    </div>
  );
}

function Week({ week_id }) {
  const week = test_weeks.filter((w) => w.id === week_id)[0];
  return (
    <div className="w-full mt-2 p-4 border border-black  rounded-xl">
      <div className="flex flex-col">
        <div className="ml-2 text-left">{week.name}</div>
      </div>
      <div className="flex flex-row">
        {(week.days.map((day) => {
          return (<Day day_id={day} />);
        }))}
      </div>
    </div>
  );
}

function Day({ day_id }) {
  const day = test_days.filter((d) => d.id === day_id)[0];
  return (
    <div className="w-full mt-2 p-4 border border-black  rounded-xl">
      <div className="flex flex-col">
        <div className="ml-2 text-left">{day.name}</div>
      </div>
      <ul className="flex flex-col">
        {(day.cycles.map((cycle) => {
          return (<Cycle cycle_id={cycle} />);
        }))}
      </ul>
    </div>
  );
}

function Cycle({ cycle_id }) {
  const cycle = test_cycles.filter((c) => c.id === cycle_id)[0];
  return (
    <li className="w-full mt-2 p-4 border border-blue  rounded-xl">
      <div className="flex flex-row">
        <div className="ml-2 text-left">{cycle.name}</div>
        <HamburgerButton className="ml-auto" dropdownToggle={"dropdown"} />
      </div>
      <div className="flex flex-col">
        <CycleSection title="Coaching Notes" info={cycle.coach_notes} />
        <CycleSection title="Equipment" info={cycle.equipment} />
        <CycleSection title="Sets" info={cycle.num_of_sets} />
        <CycleSection title="Reps" info={cycle.num_of_reps} />
        <CycleSection title="Weight" info={cycle.weight} />
        <CycleSection title="Rest Time" info={cycle.rest_time} />
      </div>
    </li>
  );
}

function CycleSection({ title, info }) {
  return (
    <div className="flex flex-col border-b-2 border-black mt-1">
      <div className="ml-2 text-black font-bold whitespace-nowrap text-xs text-left">{title}:</div>
      <div className="flex-shrink-0  w-full ml-2 text-left">{info}</div>
    </div>
  );
}


function SecondaryPageHeader({ historyManager, title, ...props }) {
  const buttonName = props.buttonName;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <BackButton className={`my-2 ml-3`} historyManager={historyManager} />
        <h1 className="m-auto text-black text-2xl font-bold">{title}</h1>
        <PrimaryButton className="m-2">{buttonName}</PrimaryButton>
        <HamburgerButton className="mx-2 my-auto" />
      </div>
      <div className="w-full border-b border-black" />
    </div>
  );
}

function BackButton({ historyManager, ...props }) {
  // svg of a back arrow 
  return (
    <SecondaryButton type='button' className={props.className} {...props} onClick={historyManager.pop}> Back </SecondaryButton>
  );
}


