import { EditorContext, PreviewType } from '@uiw/react-md-editor';
import classNames from 'classnames/bind';
import styles from './customPreviewButton.module.scss';
import { useContext } from 'react';

const cn = classNames.bind(styles);

function PreviewButton({ preview }: { preview: PreviewType }) {
  const { dispatch } = useContext(EditorContext);
  if (dispatch) {
    const click = () => {
      dispatch({
        preview: preview === 'preview' ? 'preview' : 'edit',
      });
    };

    return (
      <div className={cn('preview-button')} onClick={click}>
        {preview === 'preview' ? 'preview' : 'edit'}
      </div>
    );
  }
}

export const codePreview = {
  name: 'preview',
  keyCommand: 'preview',
  value: 'preview',
  icon: <PreviewButton preview="preview" />,
};

export const codeEdit = {
  name: 'edit',
  keyCommand: 'edit',
  value: 'edit',
  icon: <PreviewButton preview="edit" />,
};
