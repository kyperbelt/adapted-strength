/*
Module: App.js
Team: TeraBITE
*/
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useState } from 'react';
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
import Leaderboard from './pages/Leaderboard.jsx';
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import About from "./pages/About.jsx";
import ManageChats from "./pages/manageChats.jsx";
import Chat from "./pages/Chat";
// import firebase utils
import { fetchToken } from './firebase';

/*
IMPORTS FOR PROGRAM PAGES
*/
//--------------------------------------------------
import General from './pages/program_pages/UserProgram.jsx';
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
const ProgramManagement = lazy(() => import('./pages/program_management/ProgramManagement.jsx'));
const UserManagement = lazy(() => import('./pages/user_management/UserManagement.jsx'));
const WebAdmin = lazy(() => import('./pages/web_admin/WebAdmin.jsx'));
const PaymentCheckout = lazy(() => import('./pages/PaymentCheckout.jsx'));
const MovementLibrary = lazy(() => import('./pages/MovementLibrary.jsx'));
const SendNotifications = lazy(() => import('./pages/SendNotifications.jsx'));
const Tab = lazy(() => import("./components/TabComponents/Tab.jsx"));

// import footer from '../footer'

function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  { !isTokenFound && fetchToken(setTokenFound); }


  return (
    <div id="app" className="flex-1 flex flex-col">
      {
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

              <Route path="edit-profile" element={
                <RouteGuard state={AuthApi.isLoggedIn} routeTo="/login">
                  <Suspense fallback="...">
                    <EditProfile />
                  </Suspense>
                </RouteGuard>
              } />


              <Route path="profile" element={<RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login"> <Profile /></RouteGuard>} />

              <Route path="profile" element={<Suspense fallback="...">
                <RouteGuard state={AuthApi.isLoggedIn} routeTo="/login">
                  <Profile />
                </RouteGuard>
              </Suspense>} />
              {/* <Route path="profile" element={<RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login"> <Profile /></RouteGuard>} /> */}

              <Route path="login" element={<RouteGuard state={() => !AuthApi.isLoggedIn()} routeTo="/profile"><Login /></RouteGuard>} />
              <Route path="about" element={<About />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="sign-up-additional" element={<SignUpAdditional />} />

              <Route path="user-management/:email?" element={<UserManagement />} />
              <Route path="/program-management/:programId?/:weekId?/:dayId?" element={
                <Suspense fallback="...">
                  <RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login">
                    <ProgramManagement />
                  </RouteGuard>
                </Suspense>
              } />
              <Route path="/web-admin" element={
                <Suspense fallback="...">
                  <RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login">
                    <WebAdmin />
                  </RouteGuard>
                </Suspense>
              } />
              <Route path="/movement-library/:movementId?" element={
                <Suspense fallback="...">
                  { /*TODO: check if we want to allow for all users*/}
                  <RouteGuard state={() => true} routeTo="/login">
                    <MovementLibrary />
                  </RouteGuard>
                </Suspense>
              } />


            /* ROUTES FOR PROGRAM PAGES */
              //--------------------------------------------------

            // <Route path="user-program" element={<General />} />
            //--------------------------------------------------

              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="health-questionnaire" element={<HealthQuestionnaire />} />
              <Route path="memberships" element={<Memberships />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              // <Route path='video-library' element={<VideoLibrary />} />
              <Route path="chat" element={<Chat />} />
              <Route path="consultations" element={<Booking />} />
              <Route path="*" element={<NotFound />} />
              <Route path="payment-checkout/:plan?" element={
                <RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login"> <PaymentCheckout /> </RouteGuard>
              } />

            /* ROUTES FOR CHAT PAGES */
              //--------------------------------------------------
              <Route path="manageChats" element={<ManageChats />} />
            //--------------------------------------------------
              //--------------------------------------------------


              /* Route for notifications & announcements tabs */
              //-------------------------------------------------
              <Route path="notifications" element={
                <Suspense fallback="...">
                  { /*TODO: check if we want to allow for all users*/}
                  <RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login">
                    <Tab />
                  </RouteGuard>
                </Suspense>
              } />
              <Route path='send_notifications' element={
                <Suspense fallback="...">
                  { /*TODO: check if we want to allow for all users*/}
                  <RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login">
                    <SendNotifications />
                  </RouteGuard>
                </Suspense>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      }
    </div >
  );
}

export default App;
