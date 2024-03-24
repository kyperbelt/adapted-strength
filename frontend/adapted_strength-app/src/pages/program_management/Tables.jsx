import {HamburgerButton} from '../../components/Button';
/**
 * @file Tables.jsx
 * @description Contains the styled table components
 */

export function StyledCheckboxTable({ ...props }) {
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


export function CustomTableRow({ selectedOrUnselected, onRowClick, onOptions, ...props }) {

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
