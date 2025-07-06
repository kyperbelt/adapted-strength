/**
 * Permission Guard Components
 * 
 * These components handle conditional rendering based on user permissions.
 * They replace the need for individual role checks throughout the app.
 */

import { useUser } from '../contexts/UserContext';

/**
 * PermissionGuard - Renders children only if user has required permissions
 * 
 * @param {Object} props
 * @param {string|string[]} props.permission - Required permission(s)
 * @param {string} props.mode - 'any' (default) or 'all' for multiple permissions
 * @param {React.ReactNode} props.children - Content to render if permission check passes
 * @param {React.ReactNode} props.fallback - Content to render if permission check fails
 * @param {boolean} props.requireAuth - Whether authentication is required (default: true)
 */
export const PermissionGuard = ({ 
  permission, 
  mode = 'any', 
  children, 
  fallback = null,
  requireAuth = true 
}) => {
  const { isAuthenticated, hasPermission, hasAnyPermission, hasAllPermissions, isLoading } = useUser();

  // Show loading state while checking authentication
  if (isLoading) {
    return fallback;
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return fallback;
  }

  // Handle single permission
  if (typeof permission === 'string') {
    return hasPermission(permission) ? children : fallback;
  }

  // Handle multiple permissions
  if (Array.isArray(permission)) {
    const hasAccess = mode === 'all' 
      ? hasAllPermissions(permission)
      : hasAnyPermission(permission);
    
    return hasAccess ? children : fallback;
  }

  // If no permission specified, just check authentication
  return isAuthenticated ? children : fallback;
};

/**
 * RoleGuard - Renders children only if user has required roles
 * (Kept for backward compatibility, but PermissionGuard is preferred)
 * 
 * @param {Object} props
 * @param {string|string[]} props.role - Required role(s)
 * @param {string} props.mode - 'any' (default) or 'all' for multiple roles
 * @param {React.ReactNode} props.children - Content to render if role check passes
 * @param {React.ReactNode} props.fallback - Content to render if role check fails
 */
export const RoleGuard = ({ 
  role, 
  mode = 'any', 
  children, 
  fallback = null 
}) => {
  const { isAuthenticated, hasRole, hasAnyRole, isLoading } = useUser();

  // Show loading state while checking authentication
  if (isLoading) {
    return fallback;
  }

  // Check authentication
  if (!isAuthenticated) {
    return fallback;
  }

  // Handle single role
  if (typeof role === 'string') {
    return hasRole(role) ? children : fallback;
  }

  // Handle multiple roles
  if (Array.isArray(role)) {
    const hasAccess = mode === 'all' 
      ? role.every(r => hasRole(r))
      : hasAnyRole(role);
    
    return hasAccess ? children : fallback;
  }

  // If no role specified, just check authentication
  return isAuthenticated ? children : fallback;
};

/**
 * AuthGuard - Simple authentication check
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render if authenticated
 * @param {React.ReactNode} props.fallback - Content to render if not authenticated
 */
export const AuthGuard = ({ children, fallback = null }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return fallback;
  }

  return isAuthenticated ? children : fallback;
};

/**
 * PublicOnly - Renders children only if user is NOT authenticated
 * Useful for login/signup pages
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render if not authenticated
 * @param {React.ReactNode} props.fallback - Content to render if authenticated
 */
export const PublicOnly = ({ children, fallback = null }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return fallback;
  }

  return !isAuthenticated ? children : fallback;
};

export default PermissionGuard;
