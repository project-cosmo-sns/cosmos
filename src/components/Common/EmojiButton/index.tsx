import { EmojiCode, EmojiType } from '@/@types/type';
import { EMOJI_ICON } from '@/constants/EmojiCode';
import classNames from 'classnames/bind';
import styles from './EmojiButton.module.scss';
import { useEffect, useState } from 'react';

const cn = classNames.bind(styles);

interface EmojiButtonProps {
  isDetail?: boolean;
  emojiCode: EmojiCode;
  emojiList: EmojiType[];
  handleEmojiClick: (emojiCode: EmojiCode, isClicked: boolean) => void;
  isPending?: boolean;
}

export default function EmojiButton({
  emojiCode,
  isDetail = false,
  emojiList,
  handleEmojiClick,
  isPending,
}: EmojiButtonProps) {
  const Icon = EMOJI_ICON[emojiCode];
  const emojiData = emojiList.filter((emoji) => emoji.emojiCode === emojiCode);
  const [isClicked, setIsClicked] = useState(emojiData[0]?.isClicked);
  const [currentEmojiCount, setCurrentEmojiCount] = useState(
    emojiData[0] ? emojiData[0].emojiCount : 0,
  );

  return (
    <button
      type="button"
      className={cn('wrapper', {
        clicked: isClicked,
        detail: isDetail,
      })}
      onClick={(event) => {
        setIsClicked((prev) => !prev);
        setCurrentEmojiCount((prev) => (isClicked ? prev - 1 : prev + 1));
        console.log(currentEmojiCount);
        event.stopPropagation();
        handleEmojiClick(emojiCode, isClicked);
      }}
      disabled={isPending}
    >
      <div className={cn('container')}>
        <Icon />
        {isDetail && currentEmojiCount}
      </div>
    </button>
  );
}
