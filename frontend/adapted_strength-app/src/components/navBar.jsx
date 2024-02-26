
/*
Module: navBar.jsx
Team: TeraBITE
*/

import { AuthApi } from "../api/AuthApi";
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";
import StateGuard from "../util/StateGuard";

export default function NavBar() {
  const nav = useNavigate();

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
    <header>
      <nav className="bg-[#161A1D] text-white">
        {/* We want to use Link instead of anchor tags when we link internally */}
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/about">About Us</Link>
        <span> | </span>
        <Link to="/forgot-password">Forgot Password</Link>
        <span> | </span>
        <Link to="/prog-up">Coach Program Upload</Link>
        <Link to="profile">Profile</Link>
        <span> | </span>
        <Link to="sign-up">Sign Up</Link>
         <StateGuard state={() => AuthApi.isLoggedIn()}><span> | 
          <button className="ml-1" type="button" onClick={onLogOut}>Log Out</button></span>
        </StateGuard>
        <span> | </span>
        <Link to="chat">Chat</Link>
      </nav>
    </header>
  );

}
