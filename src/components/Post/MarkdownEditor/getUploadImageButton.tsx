import { ICommandBase, commands } from '@uiw/react-md-editor';

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
          {commands.image.icon}
        </button>
      );
    },
  };
}
