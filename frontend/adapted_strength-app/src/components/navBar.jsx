/*
Module: navBar.jsx
Team: TeraBITE
*/

import { AuthApi } from "../api/AuthApi";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StateGuard from "../util/StateGuard";
import Logo from "../assets/logo.png";

const navigation = [
  { component: <> Home</>, to: "/", selected: true },
  { component: <> Book Consultation</>, to: "/consultations", selected: false },
  { component: <span>Login</span>, to: "/login", selected: false, state: () => !AuthApi.isLoggedIn() },
  { component: <> About Us</>, to: "/about", selected: false },
  { component: <> Manage Programs</>, to: "/program-management", selected: false, state: () => AuthApi.isLoggedIn() && (AuthApi.hasRole("ROLE_COACH") || AuthApi.hasRole("ROLE_ADMIN")) },
  { component: <> Profile</>, to: "/profile", selected: false, state: () => AuthApi.isLoggedIn() },
  { component: <> My Program</>, to: "/user-program", selected: false, state: () => AuthApi.isLoggedIn() },
  { component: <> Leaderboard</>, to: "/leaderboard", selected: false },
  { component: <> Sign Up</>, to: "/sign-up", selected: false, state: () => !AuthApi.isLoggedIn() },
  { component: <> Notifications</>, to: "/notifications", selected: false },
  { component: <>SendNotifications</>, to: "/send_notifications", selected: false },
  { component: <> Logout</>, to: "/", selected: false, state: () => AuthApi.isLoggedIn(), onClick: async () => await AuthApi.logout() },

];

export default function NavBar() {
  const nav = useNavigate();
  const loc = useLocation();

  const [hamburgerOpen, setHamOpen] = useState(false);
  const [navItems, setNavItems] = useState(navigation);
  const [loggedIn, setLoggedIn] = useState(AuthApi.isLoggedIn());

  //check if the url contains one of the navigation items "to" values and if it does, set that item to selected
  useEffect(() => {
    for (let i = 0; i < navigation.length; i++) {
      if (!(i!== 0 && navigation[i].to==="/") && loc.pathname.includes(navigation[i].to)) {
        const items = navItems.map((item) => {
          item.selected = item.to === navigation[i].to;
          return item;
        });

        setNavItems(items);
        if (loggedIn != AuthApi.isLoggedIn()) {
          setLoggedIn(AuthApi.isLoggedIn());
        }
        console.log("navItems:", navItems);
      }
    }
  }, [loc.pathname]);

  const toggleHammy = (e) => {
    console.log("toggleHammy:", e.target.id);
    // list of "nav_item" elements in nav_items emlement
    if (e.target.id === "nav-item") {
      const text = e.target.textContent;
      const items = navItems.map((item) => {
        item.selected = item.text === text;
        return item;
      });
      setNavItems(items);
    }

    setHamOpen(!hamburgerOpen);
  };

  const closeHammy = () => {
    setHamOpen(false);
  };

  const onLogOut = async () => {
    // TODO: handle logout errors
    //      right now we just await and dont do nothing about it
    await AuthApi.logout();
    nav("/");
  };
  // TODO: We need to use conditional rendering for nav so that we do not show
  //      certain options when the user is not logged in for example, or if they
  //      dont have the right permissions or are in a wrong state/certain page/step.
  return (
    <div className={"sticky top-0 w-full bg-primary z-20"} key={loggedIn}>
      <div
        className={`right-0 bottom-0 left-0 bg-black opacity-50  ${hamburgerOpen ? "flex" : "hidden"
          }`}
        onClick={toggleHammy}
      />
      <nav className="border-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            onClick={() => {
              setNavItems(navigation);
            }}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={Logo}
              className="w-48 mt-3 "
              alt="Adapted Strength Logo"
            />
            <span
              className="self-center text-2xl font-semibold whitespace-nowrap " /*TODO add text here and remove text from image logo*/
            ></span>
          </Link>
          <button
            onClick={toggleHammy}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${hamburgerOpen ? "" : "hidden"
              } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul
              id="nav_items"
              className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white"
            >
              {navItems.map((item, index) => {
                return (
                  <NavItem
                    className={`${item.selected
                      ? "md:bg-transparent bg-primary-dark md:text-accent "
                      : ""
                      }`}
                    key={index}
                    to={item.to}
                    onClick={() => { closeHammy(); item.onClick && item.onClick(); }}
                    state={item.state}
                  >
                    {item.component}
                  </NavItem>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-bell-fill"
      viewBox="0 0 16 16"
    >
      <path
        id="icon-info"
        d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"
      />
    </svg>
  );
}

// <div className="block md:hidden h-9 w-9 bg-black border-solid border-2 border-red-900 rounded-full content-center fixed top-3 right-3 z-50 cursor-pointer" onClick={toggleHammy}>
//   <div className={`w-6 h-0.5 bg-white mt-2 ml-1 mb-1 rounded ${hamburgerOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
//   <div className={`w-6 h-0.5 bg-white mt-1 ml-1 mb-1 rounded ${hamburgerOpen ? 'opacity-0' : ''}`} />
//   <div className={`w-6 h-0.5 bg-white mt-1 ml-1 mb-1 rounded ${hamburgerOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
// </div>
function NavItem({ to, children, onClick, state, className }) {
  return (
    <StateGuard state={state ?? (() => { return true; })}>
      <li>
        <Link
          id="nav-item"
          to={to}
          className={`${className} text-left block py-2 px-3 text-gray-900 rounded hover:bg-primary-dark md:hover:bg-transparent md:border-0 md:hover:text-accent md:p-0`}
          onClick={onClick}
        >
          {children}
        </Link>
      </li>
    </StateGuard>
  );
}