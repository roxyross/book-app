"use server";

import { auth } from "@/auth";
import { isAdmin } from "@/utils/rbac";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function updateUserRole(userId: string, newRole: string) {
  // Get current session using Better Auth's server-side API
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Check if user is admin
  if (!session || !isAdmin((session.user as any).role)) {
    throw new Error("Unauthorized: Only admins can update user roles");
  }

  try {
    // Update user role in the database
    const result = await db.query(
      'UPDATE "user" SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [newRole, userId]
    );

    if (result.rowCount === 0) {
      throw new Error("User not found");
    }

    return {
      success: true,
      message: `User role updated to ${newRole}`,
      updatedUserId: userId
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    throw new Error("Failed to update user role");
  }
}

export async function getAllUsers() {
  // Get current session using Better Auth's server-side API
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Check if user is admin
  if (!session || !isAdmin((session.user as any).role)) {
    throw new Error("Unauthorized: Only admins can view all users");
  }

  try {
    // Fetch all users from the database
    const result = await db.query(
      'SELECT id, email, name, role, created_at FROM "user" ORDER BY created_at DESC'
    );
    const users = result.rows;

    return {
      users: users.map((user: any) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at
      }))
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}