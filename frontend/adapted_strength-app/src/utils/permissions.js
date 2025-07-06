/**
 * Permission System for Adapted Strength
 * 
 * This module defines all permissions and role mappings for the application.
 * Instead of checking individual roles throughout the app, we check permissions.
 * This makes the system more scalable and maintainable.
 */

// Define all possible permissions in the system
export const PERMISSIONS = {
  // User Management
  MANAGE_USERS: 'MANAGE_USERS',
  VIEW_USER_PROFILES: 'VIEW_USER_PROFILES',
  UPDATE_USER_SUBSCRIPTIONS: 'UPDATE_USER_SUBSCRIPTIONS',
  
  // Program Management
  MANAGE_PROGRAMS: 'MANAGE_PROGRAMS',
  CREATE_PROGRAMS: 'CREATE_PROGRAMS',
  EDIT_PROGRAMS: 'EDIT_PROGRAMS',
  DELETE_PROGRAMS: 'DELETE_PROGRAMS',
  ASSIGN_PROGRAMS: 'ASSIGN_PROGRAMS',
  
  // Content Management
  MANAGE_MOVEMENTS: 'MANAGE_MOVEMENTS',
  EDIT_MOVEMENT_LIBRARY: 'EDIT_MOVEMENT_LIBRARY',
  
  // Admin Functions
  ACCESS_WEB_ADMIN: 'ACCESS_WEB_ADMIN',
  MANAGE_SYSTEM_SETTINGS: 'MANAGE_SYSTEM_SETTINGS',
  
  // User Functions
  VIEW_OWN_PROFILE: 'VIEW_OWN_PROFILE',
  EDIT_OWN_PROFILE: 'EDIT_OWN_PROFILE',
  VIEW_OWN_PROGRAMS: 'VIEW_OWN_PROGRAMS',
  BOOK_CONSULTATIONS: 'BOOK_CONSULTATIONS',
};

// Define role-to-permission mappings
// This is the single source of truth for what each role can do
export const ROLE_PERMISSIONS = {
  // Admin has all permissions
  ROLE_ADMIN: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USER_PROFILES,
    PERMISSIONS.UPDATE_USER_SUBSCRIPTIONS,
    PERMISSIONS.MANAGE_PROGRAMS,
    PERMISSIONS.CREATE_PROGRAMS,
    PERMISSIONS.EDIT_PROGRAMS,
    PERMISSIONS.DELETE_PROGRAMS,
    PERMISSIONS.ASSIGN_PROGRAMS,
    PERMISSIONS.MANAGE_MOVEMENTS,
    PERMISSIONS.EDIT_MOVEMENT_LIBRARY,
    PERMISSIONS.ACCESS_WEB_ADMIN,
    PERMISSIONS.MANAGE_SYSTEM_SETTINGS,
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.VIEW_OWN_PROGRAMS,
    PERMISSIONS.BOOK_CONSULTATIONS,
  ],
  
  // Coach has program and user management permissions
  ROLE_COACH: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USER_PROFILES,
    PERMISSIONS.UPDATE_USER_SUBSCRIPTIONS,
    PERMISSIONS.MANAGE_PROGRAMS,
    PERMISSIONS.CREATE_PROGRAMS,
    PERMISSIONS.EDIT_PROGRAMS,
    PERMISSIONS.DELETE_PROGRAMS,
    PERMISSIONS.ASSIGN_PROGRAMS,
    PERMISSIONS.MANAGE_MOVEMENTS,
    PERMISSIONS.EDIT_MOVEMENT_LIBRARY,
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.VIEW_OWN_PROGRAMS,
    PERMISSIONS.BOOK_CONSULTATIONS,
  ],
  
  // Active users have basic access
  ROLE_ACTIVE: [
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.VIEW_OWN_PROGRAMS,
    PERMISSIONS.BOOK_CONSULTATIONS,
  ],
  
  // Inactive users have limited access
  ROLE_INACTIVE: [
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.BOOK_CONSULTATIONS, // Can still book to reactivate
  ],
  
  // Basic authenticated user permissions
  ROLE_USER: [
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.BOOK_CONSULTATIONS,
  ],
  
  // Users who have accepted terms
  ROLE_TERMS_ACCEPTED: [
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.BOOK_CONSULTATIONS,
  ],
  
  // Users who have completed account setup
  ROLE_ACCOUNT_SETUP: [
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.VIEW_OWN_PROGRAMS,
    PERMISSIONS.BOOK_CONSULTATIONS,
  ],
  
  // Email verified users
  ROLE_EMAIL_VERIFIED: [
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_PROFILE,
  ],
};

/**
 * Get all permissions for a list of user roles
 * @param {string[]} userRoles - Array of role names (e.g., ['ROLE_ADMIN', 'ROLE_USER'])
 * @returns {string[]} - Array of unique permissions
 */
export function getUserPermissions(userRoles) {
  if (!userRoles || !Array.isArray(userRoles)) {
    return [];
  }
  
  const allPermissions = new Set();
  
  userRoles.forEach(role => {
    const rolePermissions = ROLE_PERMISSIONS[role] || [];
    rolePermissions.forEach(permission => allPermissions.add(permission));
  });
  
  return Array.from(allPermissions);
}

/**
 * Check if user has a specific permission
 * @param {string[]} userPermissions - Array of user permissions
 * @param {string} requiredPermission - Permission to check
 * @returns {boolean} - True if user has the permission
 */
export function hasPermission(userPermissions, requiredPermission) {
  return userPermissions && userPermissions.includes(requiredPermission);
}

/**
 * Check if user has any of the specified permissions
 * @param {string[]} userPermissions - Array of user permissions
 * @param {string[]} requiredPermissions - Array of permissions to check
 * @returns {boolean} - True if user has at least one of the permissions
 */
export function hasAnyPermission(userPermissions, requiredPermissions) {
  if (!userPermissions || !requiredPermissions) return false;
  return requiredPermissions.some(permission => userPermissions.includes(permission));
}

/**
 * Check if user has all of the specified permissions
 * @param {string[]} userPermissions - Array of user permissions
 * @param {string[]} requiredPermissions - Array of permissions to check
 * @returns {boolean} - True if user has all of the permissions
 */
export function hasAllPermissions(userPermissions, requiredPermissions) {
  if (!userPermissions || !requiredPermissions) return false;
  return requiredPermissions.every(permission => userPermissions.includes(permission));
}

// Navigation permissions - defines what navigation items require what permissions
export const NAVIGATION_PERMISSIONS = {
  '/': [], // Home - accessible to everyone
  '/about': [], // About - accessible to everyone
  '/consultations': [PERMISSIONS.BOOK_CONSULTATIONS],
  '/movement-library': [], // Movement library - accessible to everyone
  '/program-management': [PERMISSIONS.MANAGE_PROGRAMS],
  '/user-management': [PERMISSIONS.MANAGE_USERS],
  '/web-admin': [PERMISSIONS.ACCESS_WEB_ADMIN],
  '/profile': [PERMISSIONS.VIEW_OWN_PROFILE],
  '/memberships': [PERMISSIONS.VIEW_OWN_PROFILE],
};

/**
 * Check if user can access a specific route
 * @param {string[]} userPermissions - Array of user permissions
 * @param {string} route - Route path to check
 * @returns {boolean} - True if user can access the route
 */
export function canAccessRoute(userPermissions, route) {
  const requiredPermissions = NAVIGATION_PERMISSIONS[route];
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true; // Public route
  }
  return hasAnyPermission(userPermissions, requiredPermissions);
}
