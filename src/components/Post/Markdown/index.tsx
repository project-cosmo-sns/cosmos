import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  className: string;
  content: string;
}

export default function MarkdownContent({
  className,
  content,
}: MarkdownContentProps) {
  return (
    <Markdown
      className={className}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content}
    </Markdown>
  );
}
