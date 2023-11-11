
/*
Module: App.js
Team: TeraBITE
*/
import logo from './logo.png';
import icon from './ladyIcon.png'
import './App.css';
import NavBar from './components/navBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound.jsx";

// import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={icon} className="App-icon" alt="lady icon" />
        <p>
          READY TO GET FIT?
        </p>
        <p>
          Get started below!
        </p>
        <a className="App-link"
          href="https://adaptedstrength.com"
          target="_blank"
          rel="noopener noreferrer">
          Link to beta app
        </a>
      </header>
      <nav class = "App-nav">
        <NavBar></NavBar>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            {/* Add more routes here the same way as above */}
            {/*Example:  <Route path="sign-up" element={<SignUp/>} /> */}

            {/* When no route available we go to not found */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
