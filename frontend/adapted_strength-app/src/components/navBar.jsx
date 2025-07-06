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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
          {/* Logo - removed redundant text since logo includes the name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src={Logo} alt="Adapted Strength" />
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

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
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
                
                {/* Desktop Dropdown Menu */}
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {/* Mobile Navigation Items */}
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.to
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-100'
              }`}
            >
              {item.component}
            </Link>
          ))}
          
          {/* Mobile User Menu */}
          {isAuthenticated ? (
            <>
              <hr className="my-2 border-gray-200" />
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-500 mb-2">Account</div>
                {profileNavigation.map((item, index) => (
                  <PermissionGuard key={index} permission={item.permission} requireAuth={true}>
                    <Link
                      to={item.to}
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 text-base text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-md"
                    >
                      {item.component}
                    </Link>
                  </PermissionGuard>
                ))}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-md mt-2"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <hr className="my-2 border-gray-200" />
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-md"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-base font-medium bg-red-600 text-white hover:bg-red-700 rounded-md mx-3 mt-2"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
