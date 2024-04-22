import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import TermBadge from '@/components/Common/Badge/TermBadge';
import classNames from 'classnames/bind';
import styles from './FeedCard.module.scss';
import {
  CommentIcon,
  EmojiIcon,
  EyeIcon,
  ProfileIcon,
} from '@/components/Common/IconCollection';

interface FeedCardTypes {
  userImage: string;
  userName: string;
  term: number;
  date: string;
  content: string;
  emojiCount: number;
  commentCount: number;
  eyeCount: number;
  modalVisible?: boolean;
  toggleModal?: Dispatch<SetStateAction<boolean>>;
  hasPadding: boolean;
}

const cn = classNames.bind(styles);

export default function FeedCard({
  userImage = '',
  userName = '코스모스',
  term = 0,
  date = '2024.4.11',
  content = '',
  emojiCount = 0,
  commentCount = 0,
  eyeCount = 0,
  modalVisible = false,
  toggleModal,
  hasPadding,
}: FeedCardTypes) {
  return (
    <div
      onClick={() => toggleModal && toggleModal(!modalVisible)}
      className={cn('container', hasPadding && 'padding')}
    >
      <div className={cn('wrapper')}>
        <div className={cn('user')}>
          <div className={cn('user-image')}>
            <ProfileIcon />
          </div>
          <div className={cn('user-wrapper')}>
            <div className={cn('info')}>
              <div className={cn('name')}>{userName}</div>
              <TermBadge term={term} />
            </div>
            <div className={cn('createdAt')}>{date}</div>
          </div>
        </div>
        <div className={cn('content')}>{content}</div>
        <div className={cn('interaction')}>
          <div className={cn('interaction-wrapper')}>
            <div className={cn('interaction-emoji')}>
              <div className={cn('emoji-wrapper')}>
                <EmojiIcon width="18" height="18" />
                <span>{emojiCount}</span>
              </div>
            </div>
            <div className={cn('interaction-comment')}>
              <div className={cn('comment-wrapper')}>
                <CommentIcon width="18" height="18" />
                <span>{commentCount}</span>
              </div>
            </div>
            <div className={cn('interaction-eye')}>
              <div className={cn('eye-wrapper')}>
                <EyeIcon width="18" height="18" />
                <span>{eyeCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
