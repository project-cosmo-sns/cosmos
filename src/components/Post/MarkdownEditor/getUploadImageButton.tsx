import { ICommandBase } from '@uiw/react-md-editor';

export default function getUploadImageButton(): ICommandBase<string> {
  return {
    name: 'uploadImage',
    keyCommand: 'uploadImage',
    render: (command, disabled, executeCommand) => {
      return (
        <button
          type="button"
          aria-label="Upload Image"
          disabled={disabled}
          onClick={() => console.log('이미지 업로드')}
        >
          Upload Image
        </button>
      );
    },

    execute: (state, api, imageUrl) => {
      // 이미지 삽입 코드
      const modifyText = `![image](${imageUrl})`;
      api.replaceSelection(modifyText);
    },
  };
}
