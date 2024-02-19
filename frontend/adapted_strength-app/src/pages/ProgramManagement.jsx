import { useState } from "react";
import PageCotnainer1 from "../components/PageContainer";
import { CardBack } from "../components/Card";
import LabeledInputField from "../components/forms/LabeledInputField";

// list of programs 
const test_programs = [
  {
    id: 1,
    name: "Program 1",
    description: "This is a program",
    open: false, 
    blocks: []
  },
  {
    id: 2,
    name: "Program 2",
    description: "This is a program",
    open: false, 
    blocks: []
  },
  {
    id: 3,
    name: "Program 3",
    description: "This is a program",
    open: false,
    blocks: [1]
  },
  {
    id: 4,
    name: "Program 4",
    description: "This is a program",
    open: true,
    blocks: []
  },
];


const test_blocks = [
  {
    id: 1,
    name: "Block 1",
    description: "This is a block"
  },
  {
    id: 2,
    name: "Block 2",
    description: "This is a block"
  },
  {
    id: 3,
    name: "Block 3",
    description: "This is a block"
  },
]


export default function ProgramMamagement() {

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

  return (
    <PageCotnainer1>
      <CardBack className="">
        <div className="relative p-4 flex flex-row rounded-xl xl col-span-2">
          <div className="mt-3 text-black font-bold" >Programs</div>
          <LabeledInputField className="ml-auto" placeholder="search" />
        </div>
        <div className="">
          <table className="w-full mt-4">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <>
                  <tr className="border-b text-left " key={program.name}>
                    <td onClick={() => { onRowClick(program) }} className="cursor-pointer px-6 py-3">{program.name}</td>
                    <td>{program.description}</td>
                    <td><HamburgerButtom className="ml-auto" dropdownToggle={"dropdown"} /> </td>
                  </tr>
                  {program.open && (
                    <tr className="">
                      <td className="px-6 py-3" colSpan="3">
                        <div className="grid grid-cols-1">
                          <div className="flex flex-row">
                            <button className="p-2 text-left rounded-xl bg-gray-300 max-w-2">Add Block</button>
                          </div>
                          <div className="w-full flex flex-row">
                            {(program.blocks.map((block)=>{
                                return (<span>{test_blocks.filter((b)=> b.id === block)[0].name}</span>);
                            }))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="" type="button" >sup</button>
          <DropDown id="dropdown" dropDownItems={[{ name: "Edit" }]} />
        </div>
      </CardBack>
    </PageCotnainer1>
  );
}

function HamburgerButtom({ className, dropdownToggle }) {
  return (
    <button data-dropdown-toggle={dropdownToggle} className={`relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 ${className}`} aria-expanded="false" aria-haspopup="menu" id=":r5:" type="button">
      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
        </svg>
      </span>
    </button>
  );
}

function DropDown({ id, className, dropDownItems }) {
  <div id={id} className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${className}`}>
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 " aria-labelledby="dropdownDefaultButton">
      {dropDownItems.map((item) => (
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.name}</a>
        </li>
      ))}
    </ul>
  </div>
}
