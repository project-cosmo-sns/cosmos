import { EmojiCode, EmojiType } from '@/@types/type';
import { EMOJI_CODE } from '@/constants/EmojiCode';
import classNames from 'classnames/bind';
import EmojiButton from '../EmojiButton';
import styles from './EmojiPreviewBundle.module.scss';
import { useState } from 'react';

interface EmojiPreviewBundleProps {
  emojiList: EmojiType[]; // 내가 눌렀는지 확인용
  isVisible?: boolean; // 이모지 표시 눌렀는지 아닌지에 따라 보이고 안보이는 상태
  handleEmojiClick: (emojiCode: EmojiCode, isClicked: boolean) => void; // 추가/삭제 요청
  isPending?: boolean; // 펜딩 상태
}

const cn = classNames.bind(styles);

export default function EmojiPrivewBundle({
  emojiList,
  isVisible,
  handleEmojiClick,
  isPending,
}: EmojiPreviewBundleProps) {
  return (
    isVisible && (
      <div className={cn('wrapper')}>
        <div className={cn('emoji-container')}>
          {EMOJI_CODE.map((emojiCode) => (
            <EmojiButton
              key={emojiCode}
              emojiCode={emojiCode}
              emojiList={emojiList}
              handleEmojiClick={handleEmojiClick}
              isPending={isPending}
            />
          ))}
        </div>
      </div>
    )
  );
}
