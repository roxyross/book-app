import { promises as fs } from 'fs';
import { join } from 'path';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { DocLayout } from '@/components/DocLayout';

interface ChapterPageProps {
  params: {
    chapterId: string;
    topicId: string;
  };
}

// Function to extract table of contents from MDX content
function extractToc(mdxContent: string) {
  const headingRegex = /^#{1,6}\s+(.*)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const heading = match[1];
    const level = match[0].split('#').length - 1;

    // Create a simple slug from the heading
    const id = heading.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim();

    toc.push({
      id,
      title: heading,
      level
    });
  }

  return toc;
}

// This component will render the MDX content for each chapter/topic
export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterId, topicId } = params;

  // Add validation to ensure params are defined
  if (!chapterId || !topicId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Invalid Chapter Path</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Please provide valid chapter and topic IDs.
          </p>
        </div>
      </div>
    );
  }

  // Determine the correct file path based on chapterId and topicId
  let fileName: string;
  if (topicId === '1') {
    // For the first topic, use the main chapter file
    fileName = `chapter-${chapterId}.mdx`;
  } else {
    // For the second topic, use the topic-specific file
    fileName = `chapter-${chapterId}-topic-${topicId}.mdx`;
  }

  const filePath = join(process.cwd(), 'src', 'content', 'chapters', fileName);

  try {
    const source = await fs.readFile(filePath, 'utf-8');

    // Extract table of contents before serializing
    const toc = extractToc(source);

    // Serialize the MDX source
    const mdxSource = await serialize(source, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    });

    return (
      <DocLayout toc={toc}>
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <MDXRemote {...mdxSource} />
        </article>
      </DocLayout>
    );
  } catch (error) {
    console.error('Error reading MDX file:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Chapter Not Found</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            The requested chapter ({chapterId}) or topic ({topicId}) does not exist.
          </p>
        </div>
      </div>
    );
  }
}

// Generate static params for all possible chapter/topic combinations
export async function generateStaticParams() {
  const chapters = 5;
  const topicsPerChapter = 2;

  const paths = [];

  for (let chapterId = 1; chapterId <= chapters; chapterId++) {
    for (let topicId = 1; topicId <= topicsPerChapter; topicId++) {
      paths.push({
        chapterId: chapterId.toString(),
        topicId: topicId.toString(),
      });
    }
  }

  return paths;
}