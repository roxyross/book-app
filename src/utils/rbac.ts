// Role-Based Access Control (RBAC) utilities

export enum Role {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
  GUEST = "guest",
}

// Define permissions for each role
const rolePermissions: Record<Role, string[]> = {
  [Role.ADMIN]: [
    "read:content",
    "write:content",
    "delete:content",
    "manage:users",
    "access:admin-panel",
    "use:chatbot"
  ],
  [Role.MODERATOR]: [
    "read:content",
    "write:content",
    "manage:comments",
    "use:chatbot"
  ],
  [Role.USER]: [
    "read:content",
    "use:chatbot"
  ],
  [Role.GUEST]: [
    "read:content"
  ],
};

// Check if a user has a specific permission
export function hasPermission(userRole: Role, permission: string): boolean {
  return rolePermissions[userRole]?.includes(permission) || false;
}

// Check if a user has any of the required permissions
export function hasAnyPermission(userRole: Role, permissions: string[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

// Check if a user has all required permissions
export function hasAllPermissions(userRole: Role, permissions: string[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}

// Get all permissions for a role
export function getPermissionsForRole(role: Role): string[] {
  return rolePermissions[role] || [];
}

// Check if a user has admin privileges
export function isAdmin(userRole: Role): boolean {
  return userRole === Role.ADMIN;
}

// Check if a user has moderator privileges (includes admin)
export function isModerator(userRole: Role): boolean {
  return userRole === Role.ADMIN || userRole === Role.MODERATOR;
}