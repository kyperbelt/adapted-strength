import { BasicModalDialogue } from "../components/Dialog";
import { PrimaryButton } from "../components/Button";
import { useState, useEffect} from "react";
import PageCotnainer1 from "../components/PageContainer";
import { CardBack } from "../components/Card";
import LabeledInputField from "../components/forms/LabeledInputField";
import {useHistory} from "react-router-dom";

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

const VIEW_TYPE_PROGRAMS = "programs";
const VIEW_TYPE_BLOCKS = "blocks";
const VIEW_TYPE_WEEKS = "weeks";


export default function ProgramMamagement() {
  // stack of history
  const [history, setHistory] = useState([]);
  const historyManager = {
    push: (page) => {
      setHistory([...history, page]);
    },
    pop: () => {
      const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
      return newHistory[newHistory.length - 1];
    },
    peek: () => {
      return history[history.length - 1];
    }
  };

  return (
    <PageCotnainer1>
      <CardBack className="">
        <ProgrammingView />
      </CardBack>
    </PageCotnainer1>
  );
}

function ProgrammingView({ }) {
  const [programs, setPrograms] = useState(test_programs);


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
    <>
      <div className="relative p-4 flex flex-row rounded-xl xl col-span-2">
        <div className="mt-3 text-black font-bold" >Programs</div>
        <LabeledInputField className="ml-auto" placeholder="search" />
        <PrimaryButton className="ml-2" >Add Program</PrimaryButton>
      </div>
      <div className="">
        <table className="w-full mt-4">
          <thead>
            <tr className="border-b" key="headers">
              <th className="w-1">
                <input type="checkbox" onChange={onAllCheckedOrUnchecked} />
              </th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <Program key={program.name} program={program} programSelectedOrUnselected={programSelectedOrUnselected} onRowClick={onRowClick} />
            ))}
          </tbody>
        </table>
        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="" type="button" >sup</button>
      </div>
    </>
  );
}


function Program({ program, programSelectedOrUnselected, onRowClick }) {
  const [blocks, setBlocks] = useState(test_blocks);

  const blockSelectedOrUnselected = (block, e) => {
    for (let b of blocks) {
      if (b.name === block.name) {
        b.selected = e.target.checked;
      }
    }
    setBlocks([...blocks]);
    console.log(`${e.target.checked ? "checked" : "unchecked"} ${e.target.name}`)
  }

  if (program.open) {
    console.log(`program ${program.name} is open`)
  }

  return (
    < >
      <tr className="border-b text-left " >
        <td className="px-6 py-3">
          <input type="checkbox" onChange={(e) => programSelectedOrUnselected(program, e)} checked={program.selected} />
        </td>
        <td onClick={() => { onRowClick(program) }} className="cursor-pointer px-6 py-3">{program.name}</td>
        <td>{program.description}</td>
        <td><HamburgerButtom className="ml-auto" dropdownToggle={"dropdown"} /> </td>
      </tr>
      {(
        <tr id={`program-block-${program.id}`} className={`${program.open ? 'scale-y-100 h-full opacity-100' : 'scale-y-0 h-0 opacity-0'}  transition-all duration-200 delay-0 ease-linear`}>
          {program.open && (
            <td className={`pl-12 pr-3 py-3`} colSpan="4">
              <div className="grid grid-cols-1">
                <div className="flex flex-row">
                  <button type='button' className="p-2 text-left rounded-xl bg-gray-300 max-w-2">Add Block</button>
                </div>
                <div className="w-full flex flex-row col-span-1">
                  {(program.blocks.map((block) => {
                    return (<Block block={blocks.filter((b) => b.id === block)[0]} />);
                  }))}
                </div>
              </div>
            </td>
          )}
        </tr>
      )}
    </>
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
        <HamburgerButtom className="ml-auto" dropdownToggle={"dropdown"} />
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

function HamburgerButtom({ className, dropdownToggle }) {
  return (
    <button data-dropdown-toggle={dropdownToggle} className={`relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 ${className}`} aria-expanded="false" aria-haspopup="menu" id=":r5:" type="button">
      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
          <path strokeLinecap="round" strokeLineJoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
        </svg>
      </span>
    </button>
  );
}


