import { HamburgerButton } from '../../components/Button';
/**
 * @file Tables.jsx
 * @description Contains the styled table components
 */

export function StyledCheckboxTable({ ...props }) {
  const headers = props.headers;
  const children = props.children;


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
    <table className={`w-full text-sm text-left rtl:text-right text-gray-500 ${props.className}`}>
      <thead>
        <tr className="border-b" key="headers">
          <th className="w-1 px-6">
            <input id="select_all" type="checkbox" onChange={(e) => selectAll(e, props.onAllSelected)} />
          </th>
          {headers.map((header) => {
            return (<th key={header} className="px-6 py-3 text-left font-bold">{header}</th>);
          })}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
}


export function CustomTableRow({ selectedOrUnselected, onRowClick, onOptionClick, ...props }) {
  const data = props.data;
  const whenOptionsClicked = (e) => {
    e.stopPropagation();
    if (onOptionClick) {
      onOptionClick(e);
    }
    e.target.closest('td').querySelector('#dropdown').classList.toggle('hidden');

  }

  const onFocusLost = (e) => {
    // add hidden class to the dropdown
    e.target.closest('td').querySelector('#dropdown').classList.add('hidden');
  }

  const oneSelected = (e, onSelected) => {
    const selected_all = e.target.closest('table').querySelector('input[type="checkbox"][id="select_all"]');
    selected_all.checked = false;

  }

  return (
    <tr className="odd:bg-white even:bg-gray-200 border-b hover:bg-gray-300 hover:cursor-pointer" onClick={onRowClick}>
      <td className="px-6 py-3">
        <input type="checkbox" onClick={(e) => { e.stopPropagation() }} onChange={(e) => oneSelected(e, selectedOrUnselected)} checked={props.checked} />
      </td>
      {data.map((item) => {
        return (<td key={item} className="px-6 py-3">{item}</td>);
      })}
      {props.children}
      <td className="relative">
        <HamburgerButton onBlur={onFocusLost} className="ml-auto" onClick={(e) => { whenOptionsClicked(e) }} />
        <DropDownMenu id="dropdown" options={['Edit', 'Delete']} className="absolute hidden right-0" />
      </td>
    </tr>
  );
}

export function DropDownMenu({ options, onOptionClick, className, ...props }) {

  const onClick = (e, option) => {
    e.stopPropagation();
    if (onOptionClick) {
      onOptionClick(option);
    }
  }

  return (

    <div className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${className}`} {...props}>
      <ul className="py-2 text-sm text-gray-700">
        {options.map((option) => {
          return (
            <li key={option}>
              <a className="block px-4 py-2 hover:bg-gray-200" onClick={(e) => onClick(e, option)}>
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
    <div class="pb-4 bg-white dark:bg-gray-900">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative mt-1">
        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
      </div>
    </div>
  );
}
