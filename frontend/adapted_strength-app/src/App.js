/*
Module: App.js
Team: TeraBITE
*/
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react';
import Layout from "./pages/Layout";
// routes imported from pages folder
// They are still only react components
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from './pages/ResetPassword';
import ResetLinkSent from './pages/ResetLinkSent';
import SignUp from './pages/SignUp';
import SignUpAdditional from './pages/SignUpAdditional.jsx';
import Memberships from './pages/Memberships.jsx'
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import About from "./pages/About.jsx";

import UploadProgram from './pages/ProgramUpload.jsx';

/*
IMPORTS FOR PROGRAM PAGES
*/
//--------------------------------------------------
import BodyBuild from './pages/program_pages/BodyBuild.jsx';
import Oly from './pages/program_pages/Oly.jsx';
import Power from './pages/program_pages/Power.jsx';
import General from './pages/program_pages/General.jsx';
//--------------------------------------------------

import Booking from './pages/Booking.jsx';
import RouteGuard from "./util/RouteGuard";
import Profile from './pages/Profile';
import { AuthApi } from './api/AuthApi';

import TermsOfService from './pages/TermsOfService.jsx';
import HealthQuestionnaire from './pages/HealthQuestionnaire';
import VideoLibrary from './pages/VideoLibrary.jsx';
import ChatTest from './pages/test_pages/ChatTest';

// TODO: Check this out guys, this is a lazy loaded component
const EditProfile = lazy(() => import('./pages/EditProfile.jsx'));

// import footer from '../footer'


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
            <Route path="chat-test" element={<ChatTest />} />

            <Route path="edit-profile" element={<Suspense fallback="...">
              <RouteGuard state={AuthApi.isLoggedIn} routeTo="/login">
                <EditProfile />
              </RouteGuard>
            </Suspense>} />
            <Route path="profile" element={<RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login"> <Profile /></RouteGuard>} />
            <Route path="login" element={<RouteGuard state={() => !AuthApi.isLoggedIn()} routeTo="/profile"><Login /></RouteGuard>} />
            <Route path="about" element={<About />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-up-additional" element={<SignUpAdditional />} />
            <Route path="prog-up" element={<UploadProgram />} />

            {/* ROUTES FOR PROGRAM PAGES */}
            {/*--------------------------------------------------*/}
            <Route path="bodybuild" element={<BodyBuild />} />
            <Route path="power-lifting" element={<Power />} />
            <Route path="oly-lifting" element={<Oly />} />
            <Route path="general-program" element={<General />} />
            {/*--------------------------------------------------*/}
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="health-questionnaire" element={<HealthQuestionnaire />} />
            <Route path="memberships" element={<Memberships />} />
            <Route path='video-library' element={<VideoLibrary />} />
            <Route path="consultations" element={<Booking />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
