import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { isAdmin } from "@/utils/rbac";
import { getAllUsers } from "@/actions/userActions";

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin using Better Auth session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !isAdmin((session.user as any).role)) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Only admins can view all users" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch all users using server action
    const result = await getAllUsers();

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}