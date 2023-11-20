
/*
Module: App.js
Team: TeraBITE
*/
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
// routes imported from pages folder
// They are still only react components
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from './pages/ResetPassword';
import ResetLinkSent from './pages/ResetLinkSent';
import SignUp from './pages/SignUp';
import SignUpAdditional from './pages/SignUpAdditional';
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import About from "./pages/About.jsx";
// import footer from '../footer'


// import './App.css';

function App() {
  return (
    <div className="App h-full my-0">
      <BrowserRouter className="">
        <Routes className="">
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* Add more routes here the same way as above */}
            {/*Example:  <Route path="sign-up" element={<SignUp/>} /> */}

            {/* When no route available we go to not found */}
            {/*Example:  <Route path="sign-up" element={<SignUp/>} /> */}
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-link-sent" element={<ResetLinkSent />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="login" element={<Login />} />
            <Route path="About" element={<About />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-up-additional" element={<SignUpAdditional />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
