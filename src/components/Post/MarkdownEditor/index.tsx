import dynamic from 'next/dynamic';
import { useState } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function MarkdownEditor() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div>
      <MDEditor
        value={value}
        onChange={setValue}
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
