import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import CodeBlock from './CodeBlock';

interface MarkdownContent {
  className: string;
  content: string;
}

export default function MarkdownContent({
  className,
  content,
}: MarkdownContent) {
  const renderImage = ({ ...props }) => (
    <img style={{ maxWidth: '100%' }} {...props} alt="" />
  );

  return (
    <Markdown
      className={className}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code: CodeBlock,
        img: renderImage,
      }}
    >
      {content}
    </Markdown>
  );
}
