import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/about">About Us</Link>
        <span> | </span>
        <Link to="/forgot-password">Forgot Password</Link>
        <span> | </span>
        <Link to="/reset-password">*Reset Password</Link>
        <span> | </span>
        <Link to="/sign-up">Sign Up</Link>
      </nav>
    </header>
  );
}