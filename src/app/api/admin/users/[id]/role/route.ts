import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { isAdmin } from "@/utils/rbac";
import { updateUserRole } from "@/actions/userActions";
import { Role } from "@/utils/rbac";

// Define valid roles
const VALID_ROLES = Object.values(Role);

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Check if user is admin using Better Auth session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !isAdmin((session.user as any).role)) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Only admins can update user roles" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { role } = body;

    // Validate the role
    if (!role || !VALID_ROLES.includes(role)) {
      return new Response(
        JSON.stringify({ error: `Invalid role. Valid roles are: ${VALID_ROLES.join(', ')}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update user role using server action
    const result = await updateUserRole(id, role);

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update user role";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}