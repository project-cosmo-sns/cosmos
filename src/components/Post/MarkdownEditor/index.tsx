import { useMutation } from '@tanstack/react-query';
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
import classNames from 'classnames/bind';
import dynamic from 'next/dynamic';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import styles from './MarkdownEditor.module.scss';
import { codeEdit, codePreview } from './customPreviewButton';
import getTitleButton from './customTool';
import getUploadImageButton from './getUploadImageButton';
import createPresinedURL from './handleUploadImage';

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
  const [isPreviewClicked, setIsPreviewClicked] = useState(false);
  const [isWriteClicked, setIsWriteClicked] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const title1 = getTitleButton(1);
  const title2 = getTitleButton(2);
  const title3 = getTitleButton(3);

  const { mutate } = useMutation({
    mutationFn: (file: File) => createPresinedURL(file),
    onSuccess: (data) => {
      const newContent = data
        ? `${content}\n <img width="300" alt="image" src="${data.split('?')[0]}" />`
        : content;
      setContent(newContent);
    },
  });

  const image = getUploadImageButton(previewUrl, () => {
    if (imageRef.current) imageRef.current.click();
  });

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

  const handleClickPreview = () => {
    setIsWriteClicked(false);
    setIsPreviewClicked(true);
  };

  const handleClickWrite = () => {
    setIsWriteClicked(true);
    setIsPreviewClicked(false);
  };

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
        commands={[
          codeEdit(isWriteClicked, handleClickWrite),
          codePreview(isPreviewClicked, handleClickPreview),
        ]}
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
      <input
        className={cn('image-input')}
        type="file"
        ref={imageRef}
        accept="image/jpeg,image/png,image/tiff"
        id="fileUpload"
        onChange={onSelectFile}
      />
    </>
  );
}
