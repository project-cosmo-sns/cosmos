import {
  Title1Icon,
  Title2Icon,
  Title3Icon,
} from '@/components/Common/IconCollection';
import { ICommandBase } from '@uiw/react-md-editor';

export default function getTitleButton(
  titleNumber: number,
): ICommandBase<number> {
  const titleIcons = [Title1Icon, Title2Icon, Title3Icon];

  return {
    name: `title${titleNumber}`,
    keyCommand: `title${titleNumber}`,

    render: (command, disabled, executeCommand) => {
      const TitleIcon = titleIcons[titleNumber - 1];

      return (
        <button
          type="button"
          aria-label={`Insert title${titleNumber}`}
          disabled={disabled}
          onClick={() => {
            executeCommand(command, command.groupName);
          }}
        >
          <TitleIcon fill={disabled ? '#585c6d' : 'white'} />
        </button>
      );
    },
    execute: (state, api) => {
      let modifyText = `${'#'.repeat(titleNumber)} ${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `${'#'.repeat(titleNumber)} `;
      }
      api.replaceSelection(modifyText);
    },
  };
}
