interface MarkdownProps {
  className: string;
  content: string;
}

export default function Markdown({ className, content }: MarkdownProps) {
  return <div className={className}>{content}</div>;
}
