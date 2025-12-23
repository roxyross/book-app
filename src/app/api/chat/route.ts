import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { hasPermission } from "@/utils/rbac";

export async function POST(request: NextRequest) {
  try {
    // Verify user session
    const session = await auth.api.getSession({
    headers: request.headers,
  });

    // Check if user is authenticated and has permission to use chatbot
    if (!session || !hasPermission((session.user as any).role, "use:chatbot")) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized: You don't have permission to use the chatbot"
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { query, user_id, user_role } = body;

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Log the request for monitoring (in a real app, you might want to store this)
    console.log(`Chat request from user ${user_id} (role: ${user_role}): ${query}`);

    // In a real implementation, this would call the backend RAG service
    // For now, we'll return a simulated response
    // In the actual implementation, this would make a request to the FastAPI backend
    const response = `This is a simulated response to your query: "${query}". In a real implementation, this would connect to the RAG system running on the FastAPI backend, which would retrieve relevant context from the book content using Cohere embeddings and Qdrant vector search, then generate a response based on that context.`;

    return new Response(
      JSON.stringify({
        response,
        user_id,
        citations: [] // In a real implementation, this would contain source citations
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}