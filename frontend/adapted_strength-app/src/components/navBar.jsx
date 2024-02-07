/*
Module: navBar.jsx
Team: TeraBITE
*/
import { Link } from "react-router-dom";

export default function NavBar() {
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
        <Link to="/profile">Profile</Link>
        <span> | </span>
        <Link to="/sign-up">Sign Up</Link>
        <span> | </span>
        <Link to="/prog-up">Coach Program Upload</Link>
      </nav>
    </header>
  );

}