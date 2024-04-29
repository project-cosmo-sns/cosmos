import classNames from 'classnames/bind';
import { Dispatch, SetStateAction, Children } from 'react';
import styles from './EmojiBundler.module.scss';

interface EmojiBundleTypes {
  children: JSX.Element[];
  handleEmojiClick?: Dispatch<SetStateAction<boolean>>;
  emojiVisible?: boolean;
  toggleHasReaction: Dispatch<SetStateAction<boolean>>;
}

export default function EmojiBundle({
  children,
  handleEmojiClick,
  emojiVisible,
  toggleHasReaction,
}: EmojiBundleTypes) {
  const cn = classNames.bind(styles);
  return (
    <div className={cn('emoji-container')}>
      <div className={cn('emoji-wrapper')}>
        {Children.map(children, (child) => (
          <div
            className={cn('emoji-item')}
            onClick={() => {
              handleEmojiClick && handleEmojiClick(!emojiVisible);
              toggleHasReaction(true);
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
