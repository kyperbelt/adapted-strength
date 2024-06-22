/*
Module: Layout.jsx
Team: TeraBITE
*/
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navBar";
import { useLocation } from "react-router-dom";
import Footer from "../components/footer";

export default function Layout() {
  const location = useLocation();
  return (
    <div id="layout" className="grow flex flex-col">
      <NavBar currentPage="" />
      <Outlet className="" />
      <Footer />
    </div>
  );
}
