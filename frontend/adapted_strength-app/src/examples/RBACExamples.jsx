/**
 * RBAC System Usage Examples
 * 
 * This file demonstrates how to use the new Role-Based Access Control system
 * throughout the Adapted Strength application.
 */

import { PermissionGuard, RoleGuard, AuthGuard } from '../components/PermissionGuard';
import { useUser } from '../contexts/UserContext';
import { PERMISSIONS } from '../utils/permissions';

// Example 1: Simple Permission Check
function AdminOnlyButton() {
  return (
    <PermissionGuard permission={PERMISSIONS.ACCESS_WEB_ADMIN}>
      <button className="btn-admin">
        Access Web Admin
      </button>
    </PermissionGuard>
  );
}

// Example 2: Multiple Permissions (user needs ANY of these)
function ManagementButton() {
  return (
    <PermissionGuard 
      permission={[PERMISSIONS.MANAGE_USERS, PERMISSIONS.MANAGE_PROGRAMS]} 
      mode="any"
    >
      <button className="btn-management">
        Management Dashboard
      </button>
    </PermissionGuard>
  );
}

// Example 3: Multiple Permissions (user needs ALL of these)
function SuperAdminButton() {
  return (
    <PermissionGuard 
      permission={[PERMISSIONS.ACCESS_WEB_ADMIN, PERMISSIONS.MANAGE_SYSTEM_SETTINGS]} 
      mode="all"
    >
      <button className="btn-super-admin">
        System Settings
      </button>
    </PermissionGuard>
  );
}

// Example 4: Using the useUser hook directly
function UserDashboard() {
  const { user, hasPermission, hasRole, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      
      {hasPermission(PERMISSIONS.MANAGE_USERS) && (
        <div>
          <h2>User Management</h2>
          <p>You can manage users</p>
        </div>
      )}
      
      {hasRole('ROLE_ADMIN') && (
        <div>
          <h2>Admin Panel</h2>
          <p>You have admin access</p>
        </div>
      )}
    </div>
  );
}

// Example 5: Fallback content for unauthorized users
function ConditionalContent() {
  return (
    <PermissionGuard 
      permission={PERMISSIONS.VIEW_OWN_PROGRAMS}
      fallback={
        <div className="alert alert-info">
          <p>You need an active subscription to view your programs.</p>
          <button>Upgrade Now</button>
        </div>
      }
    >
      <div>
        <h2>Your Programs</h2>
        <p>Here are your training programs...</p>
      </div>
    </PermissionGuard>
  );
}

// Example 6: Authentication-only guard
function ProfileSection() {
  return (
    <AuthGuard fallback={<div>Please log in to view your profile</div>}>
      <div>
        <h2>Your Profile</h2>
        <p>Profile information here...</p>
      </div>
    </AuthGuard>
  );
}

// Example 7: Role-based guard (backward compatibility)
function CoachOnlySection() {
  return (
    <RoleGuard 
      role={['ROLE_COACH', 'ROLE_ADMIN']} 
      mode="any"
      fallback={<div>Access denied: Coach or Admin role required</div>}
    >
      <div>
        <h2>Coach Dashboard</h2>
        <p>Coach-specific content here...</p>
      </div>
    </RoleGuard>
  );
}

// Example 8: Navigation item with permission
function NavigationExample() {
  const navItems = [
    {
      label: 'Home',
      path: '/',
      public: true
    },
    {
      label: 'User Management',
      path: '/user-management',
      permission: PERMISSIONS.MANAGE_USERS
    },
    {
      label: 'Program Management', 
      path: '/program-management',
      permission: PERMISSIONS.MANAGE_PROGRAMS
    }
  ];

  return (
    <nav>
      {navItems.map(item => (
        <div key={item.path}>
          {item.public ? (
            <a href={item.path}>{item.label}</a>
          ) : (
            <PermissionGuard permission={item.permission}>
              <a href={item.path}>{item.label}</a>
            </PermissionGuard>
          )}
        </div>
      ))}
    </nav>
  );
}

// Example 9: Complex permission logic
function ComplexPermissionExample() {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useUser();

  const canManageContent = hasAnyPermission([
    PERMISSIONS.MANAGE_MOVEMENTS,
    PERMISSIONS.EDIT_MOVEMENT_LIBRARY
  ]);

  const canFullyManageUsers = hasAllPermissions([
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.UPDATE_USER_SUBSCRIPTIONS,
    PERMISSIONS.VIEW_USER_PROFILES
  ]);

  return (
    <div>
      {canManageContent && (
        <section>
          <h3>Content Management</h3>
          <p>You can manage movements and library content</p>
        </section>
      )}
      
      {canFullyManageUsers && (
        <section>
          <h3>Full User Management</h3>
          <p>You have complete user management permissions</p>
        </section>
      )}
      
      {hasPermission(PERMISSIONS.BOOK_CONSULTATIONS) && (
        <button>Book Consultation</button>
      )}
    </div>
  );
}

export {
  AdminOnlyButton,
  ManagementButton,
  SuperAdminButton,
  UserDashboard,
  ConditionalContent,
  ProfileSection,
  CoachOnlySection,
  NavigationExample,
  ComplexPermissionExample
};
