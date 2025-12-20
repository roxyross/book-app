interface NavigationItem {
  title: string;
  href?: string;
  items?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Quickstart", href: "/chapters" },
    ],
  },
  {
    title: "Curriculum",
    items: [
      {
        title: "Chapter 1: Introduction to AI and ML",
        href: "/chapters/1/1",
        items: [
          { title: "What is Artificial Intelligence?", href: "/chapters/1/1" },
          { title: "Machine Learning Fundamentals", href: "/chapters/1/2" },
        ],
      },
      {
        title: "Chapter 2: Neural Networks and Deep Learning",
        href: "/chapters/2/1",
        items: [
          { title: "Neural Network Architecture", href: "/chapters/2/1" },
          { title: "Deep Learning Applications", href: "/chapters/2/2" },
        ],
      },
      {
        title: "Chapter 3: Natural Language Processing",
        href: "/chapters/3/1",
        items: [
          { title: "Foundations of NLP", href: "/chapters/3/1" },
          { title: "Modern NLP Models", href: "/chapters/3/2" },
        ],
      },
      {
        title: "Chapter 4: Computer Vision and Image Processing",
        href: "/chapters/4/1",
        items: [
          { title: "Fundamentals of Computer Vision", href: "/chapters/4/1" },
          { title: "Deep Learning in Computer Vision", href: "/chapters/4/2" },
        ],
      },
      {
        title: "Chapter 5: AI Ethics and Future Implications",
        href: "/chapters/5/1",
        items: [
          { title: "Ethical Considerations in AI", href: "/chapters/5/1" },
          { title: "Future of AI and Emerging Technologies", href: "/chapters/5/2" },
        ],
      },
    ],
  },
  {
    title: "Additional Resources",
    items: [
      { title: "AI Chat", href: "/chat" },
      { title: "Dashboard", href: "/dashboard" },
    ],
  },
];