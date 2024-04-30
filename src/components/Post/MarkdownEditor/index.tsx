import dynamic from 'next/dynamic';

interface MarkdownEditorProps {
  content: string | undefined;
  setContent: (args: string | undefined) => void;
}
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function MarkdownEditor({
  content,
  setContent,
}: MarkdownEditorProps) {
  return (
    <div>
      <MDEditor
        value={content}
        onChange={setContent}
        preview="edit"
        height={500}
        textareaProps={{
          placeholder: '글을 작성해 보세요',
          rows: 200,
          maxLength: 5000,
        }}
      />
    </div>
  );
}
