/**
 * User Context for Adapted Strength
 * 
 * This context manages user authentication state, roles, and permissions globally.
 * It replaces the need for individual API calls to check roles throughout the app.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthApi } from '../api/AuthApi';
import { getUserPermissions } from '../utils/permissions';

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize user data when the app starts
  useEffect(() => {
    initializeUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Initialize user data from token or API
   */
  const initializeUser = async () => {
    setIsLoading(true);
    
    try {
      if (AuthApi.isLoggedIn()) {
        await fetchUserData();
      } else {
        // User is not logged in
        clearUserData();
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      clearUserData();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch user data and roles from the backend
   */
  const fetchUserData = async () => {
    try {
      // Get user profile information (includes roles)
      const userResponse = await AuthApi.getUserInfo();
      
      if (userResponse && userResponse.data) {
        const userData = userResponse.data;
        const userRoles = userData.roles || [];
        const userPermissions = getUserPermissions(userRoles);
        
        setUser(userData);
        setRoles(userRoles);
        setPermissions(userPermissions);
        setIsAuthenticated(true);
        
        console.log('User data loaded:', {
          user: userData.email,
          roles: userRoles,
          permissions: userPermissions
        });
      } else {
        throw new Error('Invalid user data received');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // If we can't fetch user data but token exists, clear everything
      AuthApi.logout();
      clearUserData();
      throw error;
    }
  };

  /**
   * Clear all user data
   */
  const clearUserData = () => {
    setUser(null);
    setRoles([]);
    setPermissions([]);
    setIsAuthenticated(false);
  };

  /**
   * Login user and fetch their data
   */
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Use the existing AuthApi.login method
      const loginResponse = await AuthApi.login(credentials.username, credentials.password);
      
      if (loginResponse.status === 200) {
        // Set the auth token
        const token = loginResponse.data.payload;
        // The AuthApi.login should already set the token, but let's make sure
        if (token) {
          // Token should already be set by AuthApi.login, but we can verify
          await fetchUserData();
          return { success: true };
        } else {
          return { success: false, error: 'No token received' };
        }
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user and clear data
   */
  const logout = () => {
    AuthApi.logout();
    clearUserData();
  };

  /**
   * Refresh user data (useful after role changes)
   */
  const refreshUserData = async () => {
    if (isAuthenticated) {
      await fetchUserData();
    }
  };

  /**
   * Check if user has a specific permission
   */
  const hasPermission = (permission) => {
    return permissions.includes(permission);
  };

  /**
   * Check if user has any of the specified permissions
   */
  const hasAnyPermission = (requiredPermissions) => {
    return requiredPermissions.some(permission => permissions.includes(permission));
  };

  /**
   * Check if user has all of the specified permissions
   */
  const hasAllPermissions = (requiredPermissions) => {
    return requiredPermissions.every(permission => permissions.includes(permission));
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (role) => {
    return roles.includes(role);
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (requiredRoles) => {
    return requiredRoles.some(role => roles.includes(role));
  };

  // Context value
  const value = {
    // User data
    user,
    roles,
    permissions,
    isLoading,
    isAuthenticated,
    
    // Actions
    login,
    logout,
    refreshUserData,
    
    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
