import classNames from 'classnames/bind';
import { Dispatch, SetStateAction, Children } from 'react';
import styles from './EmojiBundle.module.scss';

interface EmojiBundleTypes {
  children: JSX.Element[];
  handleEmojiClick?: Dispatch<SetStateAction<boolean>>;
  emojiVisible?: boolean;
  toggleHasReaction: Dispatch<SetStateAction<boolean>>;
  forDetails?: boolean;
  className?: string;
}

export default function EmojiBundle({
  children,
  handleEmojiClick,
  emojiVisible,
  toggleHasReaction,
  forDetails = false,
  className,
}: EmojiBundleTypes) {
  const cn = classNames.bind(styles);
  return (
    <div
      className={cn(forDetails ? 'forDetails' : 'emoji-container', className)}
    >
      <div className={cn('emoji-wrapper', 'details-wrapper')}>
        {Children.map(children, (child) => (
          <div className={cn('details-item-wrapper')}>
            <div
              className={cn('emoji-item', 'details-item')}
              onClick={() => {
                if (forDetails) {
                  toggleHasReaction(true);
                } else {
                  handleEmojiClick && handleEmojiClick(!emojiVisible);
                  toggleHasReaction(true);
                }
              }}
            >
              {child}
              {forDetails && <p>3</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
