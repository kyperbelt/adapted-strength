import { HamburgerButton } from '../../components/Button';
/**
 * @file Tables.jsx
 * @description Contains the styled table components
 */

export function StyledCheckboxTable({ onOptionsClick, ...props }) {
  const headers = props.headers;
  const children = props.children;

  const whenOptionsClicked = (e) => {
    e.stopPropagation();
    e.target.closest('th').querySelector('#all-dropdown').classList.toggle('hidden');

  }

  const onFocusLost = (e) => {
    // add hidden class to the dropdown
    setTimeout(() => {
      e.target.closest('th').querySelector('#all-dropdown').classList.add('hidden');
    }, 300);
  }

  const OnOptionSelected = (option) => {
    console.log(`${option} selected`);
    if (onOptionsClick) {
      onOptionsClick(option);
    }
  }

  const selectAll = (e, onAllSelected) => {

    const table = e.target.closest('table');
    const checkboxes = table.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });

    if (onAllSelected) {
      onAllSelected(e.target.checked);
    }
  }


  return (
    <div className="w-full block max-h-full h-full overflow-y-auto">
      <table className={`text-sm text-left rtl:text-right text-gray-500 w-full ${props.className}`}>
        <thead className="bg-primary">
          <tr className="z-10 border-b bg-primary sticky top-0" key="headers" onClick={(e)=>e.stopPropagation()}>
            <th className="w-1 px-6">
              <input id="select_all" type="checkbox" onChange={(e) => selectAll(e, props.onAllSelected)} />
            </th>
            {headers.map((header) => {
              return (<th key={header} className="px-6 py-3 text-left font-bold">{header}</th>);
            })}
            <th className="relative">
              <HamburgerButton onBlur={onFocusLost} onClick={(e) => {
                e.stopPropagation();
                whenOptionsClicked(e);
              }} />
              <DropDownMenu id="all-dropdown" options={['Delete Selected']} onOptionClick={OnOptionSelected} className="hidden absolute right-0 font-normal z-10" />
            </th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}


export function CustomTableRow({ children, selectedOrUnselected, onRowClick, onOptionClick, options = ["Move Up","Move Down","---","Edit", "Duplicate", "---", "Delete"], ...props }) {
  const data = props.data;
  const whenOptionsClicked = (e) => {
    e.stopPropagation();
    e.target.closest('td').querySelector('#dropdown').classList.toggle('hidden');

  }

  const onFocusLost = (e) => {
    // add hidden class to the dropdown
    setTimeout(() => {
      e.target.closest('td').querySelector('#dropdown').classList.add('hidden');
    }, 300);
  }

  const oneSelected = (e, onSelected) => {
    const selected_all = e.target.closest('table').querySelector('input[type="checkbox"][id="select_all"]');
    selected_all.checked = false;
    if (props.onClick) {
      props.onClick(e.target.checked);
    }

  }

  return (
    <tr className="odd:bg-white even:bg-gray-200 border-b hover:bg-gray-300 hover:cursor-pointer" onClick={onRowClick}
    >

      <td className="px-6 py-3" onClick={(e) => { e.stopPropagation() }}>
        <input type="checkbox" onClick={(e) => { e.stopPropagation() }} onChange={(e) => oneSelected(e, selectedOrUnselected)} checked={props.checked} />
      </td>
      {data.map((item) => {
        return (<td key={`${item}_key`} className="px-6 py-3">{item}</td>);
      })}
      <td className="relative">
        <HamburgerButton onBlur={onFocusLost} className="ml-auto" onClick={(e) => { whenOptionsClicked(e) }} />
        <DropDownMenu id="dropdown" onOptionClick={onOptionClick} options={options} className="absolute hidden right-0" />
      </td>
    </tr>
  );
}

export function DropDownMenu({ options, onOptionClick, className, ...props }) {

  const onClick = (e, option) => {
    e.stopPropagation();
    console.log(`${option} clicked`);
    if (onOptionClick) {
      onOptionClick(option);
    }
  }

  return (

    <div className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${className}`} {...props}>
      <ul className="py-2 text-sm text-gray-700">
        {options.map((option, index) => {
          return (
            option === "---" ? <li key={option} className="py-1"><hr /></li> :
              <li key={option+`${index}`}>
                <a className="block px-4 py-2 hover:bg-gray-200" onClick={(e) => {
                  onClick(e, option);
                }}>
                  {option}
                </a>
              </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SearchBar({ onSearch, ...props }) {
  return (
    <div className="pb-4 bg-white me-2">
      <label htmlFor="table-search" className="sr-only">Search</label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="text" onChange={(e) => {
          const text = e.target.value;
          if (onSearch) {
            onSearch(text);
          }
        }} id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg max-w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="" />
      </div>
    </div>
  );
}
