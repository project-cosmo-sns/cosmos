import { EmojiType } from '@/@types/type';
import classNames from 'classnames/bind';
import EmojiButton from '../EmojiButton';
import styles from './EmojiBundle.module.scss';

interface EmojiBundleProps {
  emojiList: EmojiType[];
  isDetail: boolean;
}

const cn = classNames.bind(styles);

export default function EmojiBundle({ emojiList, isDetail }: EmojiBundleProps) {
  return (
    <div className={cn('wrapper')}>
      {emojiList.map((emoji) => (
        <EmojiButton key={emoji.emojiCode} emoji={emoji} isDetail={isDetail} />
      ))}
    </div>
  );
}
