"use client";

import { useSession } from "@/hooks/useSession";
import ProtectedRoute from "@/components/ProtectedRoute";
import { hasPermission } from "@/utils/rbac";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Chatbot() {
  const sessionQuery = useSession();
  const session = sessionQuery.data?.session || null;
  const loading = sessionQuery.isPending;
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has permission to use chatbot
  const userData = session as any;
  const userRole = userData?.role || 'user';
  const canUseChatbot = session && hasPermission(userRole as any, "use:chatbot");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !session || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the Python backend API to get chatbot response
      // Include user ID in the request
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: input,
          user_id: userData?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();

      // Add bot response
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot' as const
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);

      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, there was an error processing your request. Please try again.",
        sender: 'bot' as const
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div>Loading chat...</div>;
  }

  return (
    <ProtectedRoute requiredPermissions={["use:chatbot"]}>
      <div className="flex flex-col h-full bg-background border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="border-b bg-muted/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold">AI Book Assistant</h2>
              <p className="text-sm text-muted-foreground">Ask questions about the book content</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 h-96 bg-background">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
              <div className="max-w-md">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
                <p className="text-sm">
                  Ask me anything about the book content, concepts, or examples. I'm here to assist with your learning journey.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.sender === 'bot' && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                      )}
                      <div className="flex-1">
                        {message.text.split('\n').map((line, i) => (
                          <p key={i} className="mb-2 last:mb-0">{line}</p>
                        ))}
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-6 h-6 rounded-full bg-muted-foreground flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-background" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-bl-none">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={canUseChatbot ? "Message AI Assistant..." : "Login to ask questions"}
              disabled={!canUseChatbot || isLoading}
              className="flex-1 h-12 rounded-xl border border-input px-4 py-2 focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            <Button
              type="submit"
              disabled={!canUseChatbot || isLoading || !input.trim()}
              className="h-12 px-6 rounded-xl"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI Assistant can make mistakes. Consider checking important information.
          </p>
        </form>
      </div>
    </ProtectedRoute>
  );
}