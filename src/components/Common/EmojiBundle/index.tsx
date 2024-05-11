import { EmojiCode, EmojiType } from '@/@types/type';
import useOutSideClick from '@/hooks/useOutSideClick';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import EmojiButton from '../EmojiButton';
import { CommentIcon, EmojiIcon, EyeIcon } from '../IconCollection';
import styles from './EmojiBundle.module.scss';
import EmojiPreviewBundle from './EmojiPreviewBundle';

interface EmojiBundleProps {
  emojiList: EmojiType[];
  isVisible?: boolean;
  handleEmojiClick: (emojiCode: EmojiCode, isClicked: boolean) => void;
  isPending?: boolean;
  commentCount: number;
  viewCount?: number;
  isPost?: boolean;
}

const cn = classNames.bind(styles);

export default function EmojiBundle({
  emojiList,
  isVisible = true,
  handleEmojiClick,
  isPending,
  commentCount,
  viewCount,
  isPost = false,
}: EmojiBundleProps) {
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
    isVisible && (
      <div className={cn('wrapper')}>
        <div className={cn('emoji-container')}>
          {emojiList.length ? (
            <div className={cn('emoji-list')}>
              {emojiList.map((emoji) => (
                <EmojiButton
                  key={emoji.emojiCode}
                  isDetail
                  emojiCode={emoji.emojiCode}
                  emojiList={emojiList}
                  handleEmojiClick={handleEmojiClick}
                  isPending={isPending}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
          <div className={cn('reaction', 'emoji')} onClick={handleOpenEmoji}>
            <EmojiIcon width="18" height="18" />
          </div>
        </div>
        <div className={cn('container')}>
          <div ref={emojiRef}>
            <EmojiPreviewBundle
              isDetail
              isVisible={isEmojiVisible}
              emojiList={emojiList}
              handleEmojiClick={handleEmojiClick}
            />
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
        </div>
      </div>
    )
  );
}
