import classNames from 'classnames/bind';
import { CommentIcon, EmojiIcon, EyeIcon } from '../IconCollection';
import styles from './ReactionContainer.module.scss';
import { useState } from 'react';
import EmojiBundle from '../EmojiBundle';
import { EmojiType } from '@/@types/type';

interface ReactionContainerProps {
  emojiCount: number;
  commentCount: number;
  viewCount: number;
  emojis?: EmojiType[]; // 필수 prop 인데 임시로 옵셔널로 줌
}

const cn = classNames.bind(styles);

export default function ReactionContainer({
  emojiCount,
  commentCount,
  viewCount,
  emojis,
}: ReactionContainerProps) {
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);

  const handleClickEmoji = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setIsEmojiVisible((prev) => !prev);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('reaction', 'emoji')} onClick={handleClickEmoji}>
        <EmojiIcon width="18" height="18" />
        {emojiCount}
      </div>
      {isEmojiVisible && emojis && (
        <EmojiBundle
          commentCount={commentCount}
          emojiList={emojis}
          isDetail={false}
          handleEmojiClick={() => console.log('클릭')}
        />
      )}
      <div className={cn('reaction', 'comment')}>
        <CommentIcon width="18" height="18" />
        {commentCount}
      </div>
      <div className={cn('reaction', 'view')}>
        <EyeIcon width="18" height="18" />
        {viewCount}
      </div>
    </div>
  );
}
