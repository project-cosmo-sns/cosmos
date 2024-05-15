import { EmojiCode, EmojiType } from '@/@types/type';
import { EMOJI_ICON } from '@/constants/EmojiCode';
import classNames from 'classnames/bind';
import styles from './EmojiButton.module.scss';
import { MouseEvent } from 'react';
import { useFetchMemberStatus } from '@/hooks/useFetchMemberStatus';

const cn = classNames.bind(styles);

interface EmojiButtonProps {
  isDetail?: boolean;
  isClickVisible: boolean;
  setIsEmojiContainerVisible?: (args: boolean) => void;
  emojiCode: EmojiCode;
  emojiList: EmojiType[];
  handleEmojiClick: (emojiCode: EmojiCode, isClicked: boolean) => void;
  setCurrentEmojiList: (args: EmojiType[]) => void;
  isPending?: boolean;
}

export default function EmojiButton({
  emojiCode,
  setIsEmojiContainerVisible,
  isClickVisible,
  isDetail = false,
  emojiList,
  handleEmojiClick,
  setCurrentEmojiList,
  isPending,
}: EmojiButtonProps) {
  const Icon = EMOJI_ICON[emojiCode];
  const emojiData = emojiList.filter((emoji) => emoji.emojiCode === emojiCode);

  const updatedEmojiList = emojiList.map((emoji) => {
    if (emoji.emojiCode === emojiData[0]?.emojiCode) {
      return {
        emojiCode: emoji.emojiCode,
        emojiCount: emojiData[0]?.isClicked
          ? Number(emoji.emojiCount) - 1
          : Number(emoji.emojiCount) + 1,
        isClicked: !emojiData[0]?.isClicked,
      };
    }
    return emoji;
  });

  const handleUpdateCurrentEmojiList = () => {
    if (
      emojiList.some((emoji) => emoji.emojiCode === emojiData[0]?.emojiCode)
    ) {
      setCurrentEmojiList(updatedEmojiList);
    } else {
      const newEmoji = {
        emojiCode,
        emojiCount: 1,
        isClicked: !emojiData[0]?.isClicked,
      };
      setCurrentEmojiList([...emojiList, newEmoji]);
    }
  };

  const handleClickEmojiButton = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleUpdateCurrentEmojiList();
    handleEmojiClick(emojiCode, emojiData[0]?.isClicked);
    if (setIsEmojiContainerVisible) setIsEmojiContainerVisible(false);
  };

  const { checkMemberStatus } = useFetchMemberStatus();

  return (
    <button
      type="button"
      className={cn('wrapper', {
        clicked: isClickVisible ? emojiData[0]?.isClicked : false,
        detail: isDetail,
      })}
      onClick={(event) =>
        checkMemberStatus(() => handleClickEmojiButton(event))
      }
      disabled={isPending}
    >
      <div className={cn('container')}>
        <Icon />
        {isDetail && emojiData[0]?.emojiCount}
      </div>
    </button>
  );
}
