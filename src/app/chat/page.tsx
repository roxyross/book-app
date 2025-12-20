"use client";

import { useSession } from "@/hooks/useSession";
import Chatbot from "@/components/Chatbot";
import { hasPermission } from "@/utils/rbac";

export default function ChatPage() {
  const sessionQuery = useSession();
  const session = sessionQuery.data?.session || null;
  const loading = sessionQuery.isPending;

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-2">AI Book Assistant</h1>
          <p className="mb-6 text-muted-foreground">Please log in to access the chatbot</p>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  // Check if user has permission to use chatbot
  // In Better Auth, the role is an additional field in the user object
  const userData = session as any; // Type assertion to access additional fields
  const userRole = userData?.role || 'user'; // Default to 'user' role if not found
  const userEmail = userData?.email;
  const canUseChatbot = hasPermission(userRole as any, "use:chatbot");

  if (!canUseChatbot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="mb-6 text-muted-foreground">
            Your role ({userRole}) does not have permission to use the chatbot.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">AI Book Assistant</h1>
            <p className="text-muted-foreground">
              Ask questions about the book content. You're logged in as <strong>{userEmail}</strong> ({userRole}).
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm">
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
}