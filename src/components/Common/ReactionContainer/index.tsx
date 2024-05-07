import { EmojiCode, EmojiType } from '@/@types/type';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import EmojiPrivewBundle from '../EmojiBundle/EmojiPreviewBundle';
import { CommentIcon, EmojiIcon, EyeIcon } from '../IconCollection';
import styles from './ReactionContainer.module.scss';
import useOutSideClick from '@/hooks/useOutSideClick';

interface ReactionContainerProps {
  emojiCount: number;
  commentCount: number;
  viewCount: number;
  emojis: EmojiType[];
  handleEmojiClick: (emojiCode: EmojiCode, isClicked: boolean) => void;
}

const cn = classNames.bind(styles);

export default function ReactionContainer({
  emojiCount,
  commentCount,
  viewCount,
  emojis,
  handleEmojiClick,
}: ReactionContainerProps) {
  const emojiRef = useRef(null);
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);

  const handleOpenEmoji = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setIsEmojiVisible((prev) => !prev);
  };

  useOutSideClick({
    ref: emojiRef,
    callback: () => setIsEmojiVisible(false),
  });

  return (
    <div className={cn('wrapper')}>
      <div
        className={cn('reaction', { clicked: emojis?.length })}
        onClick={handleOpenEmoji}
      >
        <EmojiIcon
          width="18"
          height="18"
          fill={emojis?.length ? '#8576FF' : undefined}
        />
        {emojiCount}
      </div>
      <div className={cn('reaction')}>
        <CommentIcon width="18" height="18" />
        {commentCount}
      </div>
      <div className={cn('reaction')}>
        <EyeIcon width="18" height="18" />
        {viewCount}
      </div>
      <div ref={emojiRef}>
        <EmojiPrivewBundle
          isVisible={isEmojiVisible}
          emojiList={emojis}
          handleEmojiClick={handleEmojiClick}
        />
      </div>
    </div>
  );
}
