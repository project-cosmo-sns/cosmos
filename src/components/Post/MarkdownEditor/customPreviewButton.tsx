import { EditorContext, PreviewType } from '@uiw/react-md-editor';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import styles from './customPreviewButton.module.scss';

const cn = classNames.bind(styles);

interface PreviewButtonProps {
  preview: PreviewType;
  isClicked: boolean;
  setIsClicked: (args: boolean) => void;
}

function PreviewButton({
  preview,
  isClicked,
  setIsClicked,
}: PreviewButtonProps) {
  const { dispatch } = useContext(EditorContext);
  if (dispatch) {
    const click = () => {
      setIsClicked(!isClicked);
      dispatch({
        preview: preview === 'preview' ? 'preview' : 'edit',
      });
    };

    return (
      <div
        className={cn('preview-button', { clicked: isClicked })}
        onClick={click}
      >
        {preview === 'preview' ? 'preview' : 'write'}
      </div>
    );
  }
}

export const codePreview = (
  isClicked: boolean,
  setIsClicked: (args: boolean) => void,
) => {
  return {
    name: 'preview',
    keyCommand: 'preview',
    value: 'preview',
    icon: (
      <PreviewButton
        preview="preview"
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
    ),
  };
};

export const codeEdit = (
  isClicked: boolean,
  setIsClicked: (args: boolean) => void,
) => {
  return {
    name: 'edit',
    keyCommand: 'edit',
    value: 'edit',
    icon: (
      <PreviewButton
        preview="edit"
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
    ),
  };
};
