
/*
Module: navBar.jsx
Team: TeraBITE
*/

import { AuthApi } from "../api/AuthApi";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import StateGuard from "../util/StateGuard";
import Logo from "../assets/logo.png";

export default function NavBar() {
  const nav = useNavigate();
  const [hamburgerOpen, setHamOpen] = useState(false);

  const toggleHammy = () => {
    setHamOpen(!hamburgerOpen);
  }

  const onLogOut = async () => {
    // TODO: handle logout errors
    //      right now we just await and dont do nothing about it
    await AuthApi.logout();
    nav("/");

  }
  // TODO: We need to use conditional rendering for nav so that we do not show 
  //      certain options when the user is not logged in for example, or if they 
  //      dont have the right permissions or are in a wrong state/certain page/step.
  return (
    <div className={'bg-black'}>
      <div className={`right-0 bottom-0 left-0 bg-black opacity-50  ${hamburgerOpen ? 'flex' : 'hidden'}`} onClick={toggleHammy} />
      <nav className="top-0 bg-white border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="Adapted Strength Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap " /*TODO add text here and remove text from image logo*/></span>
          </Link>
          <button onClick={toggleHammy} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={`${hamburgerOpen ? '':'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <NavItem to="/"  onClick={toggleHammy}>Home</NavItem>
              <NavItem to="/consultations"  onClick={toggleHammy}>Book Consultation</NavItem>
              <NavItem to="/login"  onClick={toggleHammy}>Login</NavItem>
              <NavItem to="/about"  onClick={toggleHammy}>About Us</NavItem>
              <NavItem to="/forgot-password"  onClick={toggleHammy}>Forgot Password</NavItem>
              <NavItem to="/program-management"  onClick={toggleHammy}>Manage Programs</NavItem>
              <NavItem to="/profile"  onClick={toggleHammy}>Profile</NavItem>
              <NavItem to="/sign-up"  onClick={toggleHammy}>Sign Up</NavItem>
              <NavItem to="/notifications"  onClick={toggleHammy}>
                <div className="icon baseline"> Notifications &nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                    <path id="icon-info" d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                  </svg>
                </div>
              </NavItem>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}


      // <div className="block md:hidden h-9 w-9 bg-black border-solid border-2 border-red-900 rounded-full content-center fixed top-3 right-3 z-50 cursor-pointer" onClick={toggleHammy}>
      //   <div className={`w-6 h-0.5 bg-white mt-2 ml-1 mb-1 rounded ${hamburgerOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
      //   <div className={`w-6 h-0.5 bg-white mt-1 ml-1 mb-1 rounded ${hamburgerOpen ? 'opacity-0' : ''}`} />
      //   <div className={`w-6 h-0.5 bg-white mt-1 ml-1 mb-1 rounded ${hamburgerOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
      // </div>
function NavItem({ to, children, onClick }) {
  return (
    <li>
      <Link to={to} className="text-left block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" onClick={onClick}>{children}</Link>
    </li>
  );
}
