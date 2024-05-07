import { ICommandBase } from '@uiw/react-md-editor';

export default function getUploadImageButton(
  previewUrl: string,
  handleUploadImage: () => void,
): ICommandBase<string> {
  return {
    name: 'uploadImage',
    keyCommand: 'uploadImage',
    render: (command, disabled, executeCommand) => {
      return (
        <button
          type="button"
          aria-label="Upload Image"
          disabled={disabled}
          onClick={handleUploadImage}
        >
          <img src="/images/imageIcon.svg" alt="image_upload" />
        </button>
      );
    },
    execute: (state, api, imageUrl) => {
      // const modifyText = `<img width="500" alt="image" src="${previewUrl.split('?')[0]}" />`;
      console.log(imageUrl);
      // api.replaceSelection(modifyText);
      let modifyText = `#${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `'# `;
      }
      api.replaceSelection(modifyText);
    },
  };
}
