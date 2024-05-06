import { EmojiCode, EmojiType } from '@/@types/type';
import { EMOJI_CODE } from '@/constants/EmojiCode';
import classNames from 'classnames/bind';
import EmojiButton from '../EmojiButton';
import styles from './EmojiBundle.module.scss';

interface EmojiBundleProps {
  emojiList: EmojiType[];
  isDetail: boolean;
  isVisible?: boolean;
  handleEmojiClick: (emojiCode: EmojiCode, isClicked: boolean) => void;
  isPending?: boolean;
}

const cn = classNames.bind(styles);

export default function EmojiBundle({
  emojiList,
  isDetail,
  isVisible = true,
  handleEmojiClick,
  isPending,
}: EmojiBundleProps) {
  return (
    isVisible && (
      <div className={cn('wrapper')}>
        {EMOJI_CODE.map((emojiCode) => (
          <EmojiButton
            key={emojiCode}
            isDetail={isDetail}
            emojiCode={emojiCode}
            emojiList={emojiList}
            handleEmojiClick={handleEmojiClick}
            isPending={isPending}
          />
        ))}
      </div>
    )
  );
}
