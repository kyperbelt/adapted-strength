
/*
Module: navBar.jsx
Team: TeraBITE
*/

import { AuthApi } from "../api/AuthApi";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import StateGuard from "../util/StateGuard";

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
    <div className={'z-50'}>
      <div className={`fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-100 ${hamburgerOpen ? 'block' : 'hidden'}`} onClick={toggleHammy}></div>
      <nav className={`fixed top-0 right-0 h-full bg-gray-900 text-white w-64 py-8 px-4 transform transition-transform ease-in-out duration-300 ${hamburgerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col">
          <Link to="/" className="py-2 my-1 bg-gray-700 rounded-full hover:bg-gray-800" onClick={toggleHammy}>HOME</Link>
          <Link to="/consultations" className="py-2 my-1 bg-gray-700 rounded-full hover:bg-gray-800" onClick={toggleHammy}>Book a Coaching Session</Link>
          <Link to="/login" className="py-2 my-1 bg-gray-700 rounded-full hover:bg-gray-800" onClick={toggleHammy}>Login</Link>
          <Link to="/about" className="py-2 my-1 bg-gray-700 rounded-full hover:bg-gray-800" onClick={toggleHammy}>About Us</Link>
          <Link to="/forgot-password" className="py-2  my-1 bg-gray-700 rounded-full hover:bg-gray-800" onClick={toggleHammy}>Forgot Password</Link>
          <Link to="/program-management" className="py-2  my-1 bg-gray-700 rounded-full hover:bg-gray-800" onClick={toggleHammy}>Manage Programs</Link>
          <Link to="/profile" className="py-2 my-1 bg-gray-700 rounded-full hover:bg-gray-800" onClick={toggleHammy}>Profile</Link>
          <Link to="/sign-up" className="py-2 my-1 bg-gray-700 rounded-full hover:bg-gray-800" onClick={toggleHammy}>Sign Up</Link>
        </div>
      </nav>
      <div className="h-9 w-9 bg-black border-solid border-2 border-red-900 rounded-full content-center fixed top-3 right-3 z-50 cursor-pointer" onClick={toggleHammy}>
        <div className={`w-6 h-0.5 bg-white mt-2 ml-1 mb-1 rounded ${hamburgerOpen ? 'transform transition-transform ease-in-out duration-300 rotate-45 translate-y-1.5' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white mt-1 ml-1 mb-1 rounded ${hamburgerOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white mt-1 ml-1 mb-1 rounded ${hamburgerOpen ? 'transform transform transition-transform ease-in-out duration-300 -rotate-45 -translate-y-1.5' : ''}`}></div>
      </div>
    </div>
  );
}
