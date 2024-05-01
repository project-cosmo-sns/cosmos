import {
  bold,
  codeBlock,
  divider,
  image,
  italic,
  link,
  orderedListCommand,
  quote,
  strikethrough,
  table,
  unorderedListCommand,
} from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';
import { codeEdit, codePreview } from './customPreviewButton';
import getTitleButton from './customTool';

interface MarkdownEditorProps {
  content: string | undefined;
  setContent: (args: string | undefined) => void;
}
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function MarkdownEditor({
  content,
  setContent,
}: MarkdownEditorProps) {
  const title1 = getTitleButton(1);
  const title2 = getTitleButton(2);
  const title3 = getTitleButton(3);

  return (
    <MDEditor
      style={{
        width: '100%',
        fontSize: '1.6rem',
        fontWeight: '400',
      }}
      value={content}
      onChange={setContent}
      preview="edit"
      commands={[codeEdit, codePreview]}
      extraCommands={[
        title1,
        title2,
        title3,
        quote,
        bold,
        italic,
        strikethrough,
        unorderedListCommand,
        orderedListCommand,
        table,
        codeBlock,
        divider,
        image,
        link,
      ]}
      height={500}
      textareaProps={{
        placeholder: '글을 작성해 보세요',
        rows: 200,
        maxLength: 5000,
      }}
    />
  );
}
