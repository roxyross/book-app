'use client';

import { useSession } from '@/hooks/useSession';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="container py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Welcome, {session.user.name || session.user.email}!</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Your personalized AI learning dashboard</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Pick up where you left off in the AI curriculum
            </p>
            <Button asChild>
              <Link href="/chapters">View Chapters</Link>
            </Button>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">AI Chat Assistant</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Get help with AI concepts using our RAG-powered chatbot
            </p>
            <Button asChild>
              <Link href="/chat">Start Chatting</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}