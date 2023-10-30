
/*

Module: App.js
Team: TeraBITE
*/
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound.jsx";

// import './App.css';

function App() {
  return (
    <div className="App">
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
