import { EmojiType } from '@/@types/type';
import { EMOJI_ICON } from '@/constants/EmojiCode';
import classNames from 'classnames/bind';
import styles from './EmojiButton.module.scss';

const cn = classNames.bind(styles);

interface EmojiButtonProps {
  emoji: EmojiType;
  isDetail?: boolean;
}

export default function EmojiButton({
  emoji,
  isDetail = false,
}: EmojiButtonProps) {
  const Icon = EMOJI_ICON[emoji.emojiCode];
  return (
    <div className={cn('wrapper', { clicked: emoji.isClicked })}>
      <div className={cn('container')}>
        <Icon />
        {isDetail && emoji.emojiCount}
      </div>
    </div>
  );
}
