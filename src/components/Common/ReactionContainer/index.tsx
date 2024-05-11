import { EmojiCode, EmojiType } from '@/@types/type';
import useOutSideClick from '@/hooks/useOutSideClick';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import EmojiPreviewBundle from '../EmojiBundle/EmojiPreviewBundle';
import { CommentIcon, EmojiIcon, EyeIcon } from '../IconCollection';
import styles from './ReactionContainer.module.scss';

interface ReactionContainerProps {
  emojiCount: number;
  commentCount: number;
  viewCount: number;
  emojis: EmojiType[];
  isPost?: boolean;
  handleEmojiClick: (emojiCode: EmojiCode, isClicked: boolean) => void;
}

const cn = classNames.bind(styles);

export default function ReactionContainer({
  emojiCount,
  commentCount,
  viewCount,
  emojis,
  isPost = false,
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
        className={cn('reaction', 'emoji', {
          clicked: emojis?.some((emoji) => emoji.isClicked === true),
        })}
        onClick={handleOpenEmoji}
      >
        <EmojiIcon
          width="18"
          height="18"
          fill={
            emojis?.some((emoji) => emoji.isClicked === true)
              ? '#8576FF'
              : undefined
          }
        />
        {emojiCount}
      </div>
      <div className={cn('reaction')}>
        <CommentIcon width="18" height="18" />
        {commentCount}
      </div>
      {isPost && (
        <div className={cn('reaction')}>
          <EyeIcon width="18" height="18" />
          {viewCount}
        </div>
      )}
      <div ref={emojiRef}>
        <EmojiPreviewBundle
          isVisible={isEmojiVisible}
          emojiList={emojis}
          handleEmojiClick={handleEmojiClick}
        />
      </div>
    </div>
  );
}
