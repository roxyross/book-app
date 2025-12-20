import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChaptersPage() {
  const chapters = [
    {
      id: 1,
      title: "Introduction to AI and Machine Learning",
      description: "Foundational concepts and principles of artificial intelligence",
      topics: [
        { id: 1, title: "What is Artificial Intelligence?" },
        { id: 2, title: "Machine Learning Fundamentals" }
      ]
    },
    {
      id: 2,
      title: "Neural Networks and Deep Learning",
      description: "Understanding neural networks and deep learning architectures",
      topics: [
        { id: 1, title: "Neural Network Architecture" },
        { id: 2, title: "Deep Learning Applications" }
      ]
    },
    {
      id: 3,
      title: "Natural Language Processing",
      description: "Processing and understanding human language with AI",
      topics: [
        { id: 1, title: "Foundations of NLP" },
        { id: 2, title: "Modern NLP Models" }
      ]
    },
    {
      id: 4,
      title: "Computer Vision and Image Processing",
      description: "Understanding and processing visual information with AI",
      topics: [
        { id: 1, title: "Fundamentals of Computer Vision" },
        { id: 2, title: "Deep Learning in Computer Vision" }
      ]
    },
    {
      id: 5,
      title: "AI Ethics and Future Implications",
      description: "Ethical considerations and future directions in AI development",
      topics: [
        { id: 1, title: "Ethical Considerations in AI" },
        { id: 2, title: "Future of AI and Emerging Technologies" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Learning Curriculum</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore comprehensive content covering fundamental AI concepts and applications
            </p>
          </div>

          <div className="space-y-8">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {chapter.id}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">Chapter {chapter.id}: {chapter.title}</h2>
                      <p className="text-muted-foreground mb-6">{chapter.description}</p>

                      <div className="space-y-3">
                        {chapter.topics.map((topic, index) => (
                          <div key={topic.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-accent/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                                {index + 1}
                              </div>
                              <span className="font-medium">Topic {index + 1}: {topic.title}</span>
                            </div>
                            <Button asChild size="sm" className="rounded-lg">
                              <Link href={`/chapters/${chapter.id}/${topic.id}`}>Read</Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}