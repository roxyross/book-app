import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium mb-8 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Open Source • Co-Learning • Spec-Driven Development</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 mb-6">
            AI Native Learning Platform
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The next generation of AI-powered learning platform. Built with cutting-edge RAG technology,
            comprehensive curriculum, and intelligent chat assistance for personalized education.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/chapters">Start Learning</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl hover:bg-accent/50">
              <Link href="/chat">Try AI Chat</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Comparison Section */}
      <div className="container py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">AI Assisted vs AI Driven vs AI Native</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold">AI</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Assisted</h3>
              <p className="text-muted-foreground mb-4">
                Traditional tools enhanced with basic AI features.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Manual workflows
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Limited automation
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic recommendations
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <span className="text-purple-600 dark:text-purple-400 font-bold">AI</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Driven</h3>
              <p className="text-muted-foreground mb-4">
                Processes guided by AI insights and recommendations.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-guided workflows
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Enhanced automation
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Intelligent recommendations
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-sm border-2 border-primary/20">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center mb-4">
                <span className="text-white font-bold">AI</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Native</h3>
              <p className="text-muted-foreground mb-4">
                Fully integrated AI experiences designed from the ground up.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Native AI workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Deep automation</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Context-aware responses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Core Pillars Section */}
      <div className="container py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Core Pillars</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Intelligence</h3>
              </div>
              <p className="text-muted-foreground">
                Advanced AI capabilities that understand context, learn from interactions, and provide
                increasingly relevant responses to your learning journey.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Speed</h3>
              </div>
              <p className="text-muted-foreground">
                Rapid responses and immediate feedback that accelerate your learning pace without compromising depth.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Trust</h3>
              </div>
              <p className="text-muted-foreground">
                Reliable, fact-checked information with transparent sources and verifiable responses.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <svg className="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Communication</h3>
              </div>
              <p className="text-muted-foreground">
                Natural, conversational interactions that feel intuitive and supportive of your learning goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Maturity Levels */}
      <div className="container py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Organizational Maturity Levels</h2>

          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold">Level</th>
                  <th className="text-left p-4 font-semibold">Description</th>
                  <th className="text-left p-4 font-semibold">Characteristics</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">Level 1: AI Assisted</td>
                  <td className="p-4 text-muted-foreground">Basic AI tools integration</td>
                  <td className="p-4 text-sm text-muted-foreground">Manual processes with AI tools</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">Level 2: AI Augmented</td>
                  <td className="p-4 text-muted-foreground">Enhanced human-AI collaboration</td>
                  <td className="p-4 text-sm text-muted-foreground">Automated workflows with human oversight</td>
                </tr>
                <tr className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">Level 3: AI Driven</td>
                  <td className="p-4 text-muted-foreground">AI-guided decision making</td>
                  <td className="p-4 text-sm text-muted-foreground">AI recommendations influence processes</td>
                </tr>
                <tr className="hover:bg-primary/5 border-2 border-primary/20">
                  <td className="p-4 font-semibold text-primary">Level 4: AI Native</td>
                  <td className="p-4 text-primary font-medium">AI-first design principles</td>
                  <td className="p-4 text-sm text-primary font-medium">Native AI experiences, context-aware</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}