import { EmojiCode, EmojiType } from '@/@types/type';
import { EMOJI_CODE } from '@/constants/EmojiCode';
import classNames from 'classnames/bind';
import EmojiButton from '../EmojiButton';
import styles from './EmojiBundle.module.scss';
import { CommentIcon, EyeIcon } from '../IconCollection';

interface EmojiBundleProps {
  emojiList: EmojiType[];
  isVisible?: boolean;
  handleEmojiClick: (emojiCode: EmojiCode, isClicked: boolean) => void;
  isPending?: boolean;
  commentCount: number;
  viewCount?: number;
}

const cn = classNames.bind(styles);

export default function EmojiBundle({
  emojiList,
  isVisible = true,
  handleEmojiClick,
  isPending,
  commentCount,
  viewCount,
}: EmojiBundleProps) {
  return (
    isVisible && (
      <div className={cn('wrapper')}>
        <div className={cn('emoji-container')}>
          {EMOJI_CODE.map((emojiCode) => (
            <EmojiButton
              key={emojiCode}
              isDetail
              emojiCode={emojiCode}
              emojiList={emojiList}
              handleEmojiClick={handleEmojiClick}
              isPending={isPending}
            />
          ))}
        </div>
        <div className={cn('container')}>
          <div className={cn('reaction')}>
            <CommentIcon width="18" height="18" />
            {commentCount}
          </div>
          <div className={cn('reaction')}>
            <EyeIcon width="18" height="18" />
            {viewCount}
          </div>
        </div>
      </div>
    )
  );
}
