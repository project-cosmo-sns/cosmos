import { EmojiCode, EmojiType } from '@/@types/type';
import useOutSideClick from '@/hooks/useOutSideClick';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import EmojiButton from '../EmojiButton';
import EmojiSelection from '../EmojiSelection';
import { CommentIcon, EmojiIcon, EyeIcon, PlusIcon } from '../IconCollection';
import styles from './EmojiBundle.module.scss';

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
  const [isEmojiContainerVisible, setIsEmojiContainerVisible] = useState(false);
  const [currentEmojiList, setCurrentEmojiList] =
    useState<EmojiType[]>(emojiList);
  const filteredCurrentEmojiList = currentEmojiList.filter(
    (emoji) => emoji.emojiCount !== 0,
  );

  const handleOpenEmoji = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setIsEmojiContainerVisible((prev) => !prev);
  };

  useOutSideClick({
    ref: emojiRef,
    callback: () => setIsEmojiContainerVisible(false),
  });

  return (
    isVisible && (
      <div className={cn('wrapper')}>
        <div className={cn('emoji-container')}>
          {currentEmojiList.length ? (
            <div className={cn('emoji-list')}>
              {filteredCurrentEmojiList.map((emoji) => (
                <EmojiButton
                  key={emoji.emojiCode}
                  isClickVisible
                  isDetail
                  emojiCode={emoji.emojiCode}
                  emojiList={currentEmojiList}
                  setCurrentEmojiList={setCurrentEmojiList}
                  handleEmojiClick={handleEmojiClick}
                  isPending={isPending}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
          {filteredCurrentEmojiList.length !== 6 && (
            <div className={cn('reaction', 'emoji')} onClick={handleOpenEmoji}>
              <EmojiIcon width="14" height="14" />
              <PlusIcon />
              <div ref={emojiRef}>
                <EmojiSelection
                  isVisible={isEmojiContainerVisible}
                  setIsEmojiContainerVisible={setIsEmojiContainerVisible}
                  emojiList={currentEmojiList}
                  setCurrentEmojiList={setCurrentEmojiList}
                  handleEmojiClick={handleEmojiClick}
                />
              </div>
            </div>
          )}
        </div>
        <div className={cn('container')}>
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
