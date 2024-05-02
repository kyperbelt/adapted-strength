/*
Module: Layout.jsx
Team: TeraBITE
*/
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navBar";
import { useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  return (
    <div id="layout" className="grow flex flex-col">
      <NavBar currentPage="" />
      <Outlet className="" />
      {/*add footer here*/}
    </div>
  );
}
// <footer className="bg-primary text-secondary p-4">
//     <p>Footer</p>
// </footer>
