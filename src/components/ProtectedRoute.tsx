"use client";

import { useSession } from "@/hooks/useSession";
import { hasPermission, Role } from "@/utils/rbac";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions?: string[];
  requiredRole?: Role;
  fallback?: ReactNode;
}

export default function ProtectedRoute({
  children,
  requiredPermissions = [],
  requiredRole,
  fallback = <div>Access denied. You don't have permission to view this page.</div>,
}: ProtectedRouteProps) {
  const sessionQuery = useSession();
  const session = sessionQuery.data?.session || null;
  const loading = sessionQuery.isPending;
  const userData = sessionQuery.data?.user as any;

  if (loading) {
    return <div>Loading...</div>;
  }

  // If no session, user is not authenticated
  if (!session) {
    return (
      <div>
        You need to be logged in to access this page. <a href="/login">Login</a>
      </div>
    );
  }

  // Check role-based access if requiredRole is specified
  if (requiredRole) {
    // Special case: if requiredRole is USER, any logged-in user can access
    if (requiredRole === Role.USER) {
      return <>{children}</>;
    }

    // For other roles, check if user has the required role
    if (userData?.role !== requiredRole) {
      return <>{fallback}</>;
    }
    return <>{children}</>;
  }

  // Check permission-based access if requiredPermissions is specified
  if (requiredPermissions.length > 0) {
    const userRole = userData?.role as Role || Role.USER;
    const hasReqPermission = requiredPermissions.some(permission =>
      hasPermission(userRole, permission)
    );

    if (!hasReqPermission) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}