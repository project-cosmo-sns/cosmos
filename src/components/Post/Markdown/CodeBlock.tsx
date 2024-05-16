import { ClassAttributes, HTMLAttributes } from 'react';
import { ExtraProps } from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function CodeBlock(
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps,
) {
  const { className, children } = props;
  const match = /language-(\w+)/.exec(className || '');
  return (
    <SyntaxHighlighter
      PreTag="div"
      showLineNumbers
      language={match ? match[1] : 'text'}
      style={oneDark}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
}
