/*
Module: Layout.jsx
Team: TeraBITE
*/
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navBar";

export default function Layout() {
    return (
        <div className="w-full h-full flex flex-col my-0">
            <Outlet className="" />
            <NavBar />
        </div>
    );
}
