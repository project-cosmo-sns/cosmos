import {
  bold,
  codeBlock,
  divider,
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
import getUploadImageButton from './getUploadImageButton';
import { useMutation } from '@tanstack/react-query';
import createPresinedURL from './handleUploadImage';
import { ChangeEvent, useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MarkdownEditor.module.scss';

interface MarkdownEditorProps {
  content: string | undefined;
  setContent: (args: string | undefined) => void;
}
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const cn = classNames.bind(styles);

export default function MarkdownEditor({
  content,
  setContent,
}: MarkdownEditorProps) {
  const [previewUrl, setPreviewUrl] = useState('');
  const [isImageUploadVisible, setIsImageUploadVisible] = useState(false);

  const title1 = getTitleButton(1);
  const title2 = getTitleButton(2);
  const title3 = getTitleButton(3);

  const { mutate } = useMutation({
    mutationFn: (file: File) => createPresinedURL(file),
  });

  const image = getUploadImageButton(previewUrl, () =>
    setIsImageUploadVisible((prev) => !prev),
  );

  const fileCheck = useCallback((type: string) => {
    const filetype = type.split('/')[1];
    const extArr = ['jpg', 'jpeg', 'png', 'tif', 'tiff'];
    return extArr.includes(filetype);
  }, []);

  const onSelectFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && fileCheck(selectedFile.type)) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      mutate(selectedFile);
    } else {
      alert('jpeg, png, tiff 파일만 업로드 가능합니다.');
    }
  }, []);

  return (
    <>
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
      {isImageUploadVisible && (
        <input
          className={cn('image-input')}
          type="file"
          accept="image/jpeg,image/png,image/tiff"
          id="fileUpload"
          onChange={onSelectFile}
        />
      )}
    </>
  );
}
