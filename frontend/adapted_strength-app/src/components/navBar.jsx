/*
Module: navBar.jsx
Team: TeraBITE
*/

import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PermissionGuard } from "./PermissionGuard";
import { useUser } from "../contexts/UserContext";
import { PERMISSIONS } from "../utils/permissions";
import Logo from "../assets/logo.png";

const navigation = [
  { component: <> Home</>, to: "/", selected: true },
  { component: <> Book Consultation</>, to: "/consultations", selected: false, permission: PERMISSIONS.BOOK_CONSULTATIONS },
  { component: <> About Us</>, to: "/about", selected: false },
  { component: <> Movement Library</>, to: "/movement-library", selected: false },
  { component: <> Manage Programs</>, to: "/program-management", selected: false, permission: PERMISSIONS.MANAGE_PROGRAMS },
  { component: <> Manage Users</>, to: "/user-management", selected: false, permission: PERMISSIONS.MANAGE_USERS },
  { component: <> Web Admin</>, to: "/web-admin", selected: false, permission: PERMISSIONS.ACCESS_WEB_ADMIN },
];

const profileNavigation = [
  { component: <> Profile</>, to: "/profile", selected: false, permission: PERMISSIONS.VIEW_OWN_PROFILE },
  { component: <> Memberships</>, to: "/memberships", selected: false, permission: PERMISSIONS.VIEW_OWN_PROFILE },
  { component: <> My Programs</>, to: "/user-programs", selected: false, permission: PERMISSIONS.VIEW_OWN_PROGRAMS },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, isLoading, hasPermission } = useUser();
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    // Filter navigation items based on user permissions
    const filteredItems = navigation.filter(item => {
      // If no permission required, show to everyone
      if (!item.permission) return true;
      
      // If user is not authenticated, don't show protected items
      if (!isAuthenticated) return false;
      
      // Check if user has the required permission
      return hasPermission(item.permission);
    });
    
    setNavItems(filteredItems);
  }, [isAuthenticated, hasPermission]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img className="h-8 w-auto" src={Logo} alt="Adapted Strength" />
              <span className="ml-2 text-xl font-semibold">Loading...</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src={Logo} alt="Adapted Strength" />
              <span className="ml-2 text-xl font-semibold text-gray-800">Adapted Strength</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.to
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-700 hover:text-red-600 hover:bg-gray-100'
                }`}
              >
                {item.component}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {profileNavigation.map((item, index) => (
                    <PermissionGuard key={index} permission={item.permission} requireAuth={true}>
                      <Link
                        to={item.to}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.component}
                      </Link>
                    </PermissionGuard>
                  ))}
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.to
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-100'
              }`}
            >
              {item.component}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
