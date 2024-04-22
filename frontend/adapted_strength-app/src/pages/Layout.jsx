/*
Module: Layout.jsx
Team: TeraBITE
*/
import { Outlet, Link} from "react-router-dom";
import NavBar from "../components/navBar";

export default function Layout() { 

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
