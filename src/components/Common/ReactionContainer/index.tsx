import { EmojiType } from '@/@types/type';
import classNames from 'classnames/bind';
import { useState } from 'react';
import EmojiPrivewBundle from '../EmojiBundle/EmojiPreviewBundle';
import { CommentIcon, EmojiIcon, EyeIcon } from '../IconCollection';
import styles from './ReactionContainer.module.scss';

interface ReactionContainerProps {
  emojiCount: number;
  commentCount: number;
  viewCount: number;
  emojis: EmojiType[]; // 필수 prop 인데 임시로 옵셔널로 줌
}

const cn = classNames.bind(styles);

export default function ReactionContainer({
  emojiCount,
  commentCount,
  viewCount,
  emojis,
}: ReactionContainerProps) {
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);

  const handleOpenEmoji = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setIsEmojiVisible((prev) => !prev);
  };

  return (
    <div className={cn('wrapper')}>
      <div
        className={cn('reaction', { clicked: emojis.length })}
        onClick={handleOpenEmoji}
      >
        {emojis.length ? (
          <EmojiIcon width="18" height="18" fill="#8576FF" />
        ) : (
          <EmojiIcon width="18" height="18" />
        )}
        {emojiCount}
      </div>
      <EmojiPrivewBundle
        isVisible={isEmojiVisible}
        emojiList={emojis}
        handleEmojiClick={() => console.log('요청함수')}
      />
      <div className={cn('reaction')}>
        <CommentIcon width="18" height="18" />
        {commentCount}
      </div>
      <div className={cn('reaction')}>
        <EyeIcon width="18" height="18" />
        {viewCount}
      </div>
    </div>
  );
}
