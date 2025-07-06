/*
Module: App.js
Team: TeraBITE
*/
import './App.css';
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useState, useLayoutEffect } from 'react';
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

import ScrollToTop from './util/ScrollToTop';
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


// TODO: Check this out guys, this is a lazy loaded component
const EditProfile = lazy(() => import('./pages/EditProfile.jsx'));
const ProgramManagement = lazy(() => import('./pages/program_management/ProgramManagement.jsx'));
const UserManagement = lazy(() => import('./pages/user_management/UserManagement.jsx'));
const WebAdmin = lazy(() => import('./pages/web_admin/WebAdmin.jsx'));
const PaymentCheckout = lazy(() => import('./pages/PaymentCheckout.jsx'));
const MovementLibrary = lazy(() => import('./pages/MovementLibrary.jsx'));

// import footer from '../footer'

function Wrapper({ children }) {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}

function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  { !isTokenFound && fetchToken(setTokenFound); }


  // <Wrapper>
  return (
    <div id="app" className="flex-1 flex flex-col">
      {
        <BrowserRouter className="">
          <ScrollToTop />
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

              <Route path="sign-up" element={
                <RouteGuard state={() => !AuthApi.isLoggedIn()} routeTo="/profile">
                  <SignUp />
                </RouteGuard>
              } />
              <Route path="sign-up-additional" element={<SignUpAdditional />} />

              <Route path="user-management/:email?" element={
                <Suspense fallback="...">
                  <RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login">
                    <UserManagement />
                  </RouteGuard>
                </Suspense>
              } />
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
                  <RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login">
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

              // <Route path='video-library' element={<VideoLibrary />} />
              <Route path="consultations" element={<Booking />} />
              <Route path="*" element={<NotFound />} />
              <Route path="payment-checkout/:plan?" element={
                <RouteGuard state={() => AuthApi.isLoggedIn()} routeTo="/login"> <PaymentCheckout /> </RouteGuard>
              } />




            </Route>
          </Routes>
        </BrowserRouter>
      }
    </div >
  );
}

// </Wrapper>

export default App;
