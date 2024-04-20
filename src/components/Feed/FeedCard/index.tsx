import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import TermBadge from '@/components/Common/Badge/TermBadge';
import classNames from 'classnames/bind';
import styles from './FeedCard.module.scss';

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
}: FeedCardTypes) {
  return (
    <div
      onClick={() => toggleModal && toggleModal(!modalVisible)}
      className={cn('feed-card-container')}
    >
      <div className={cn('feed-card-wrapper')}>
        <div className={cn('feed-card-user')}>
          <div className={cn('user-image')}>
            <Image
              fill
              src={userImage || '/images/profile.svg'}
              alt="user-profile"
            />
          </div>
          <div className={cn('user-wrapper')}>
            <div className={cn('info')}>
              <div className={cn('name')}>{userName}</div>
              <TermBadge term={term} />
            </div>
            <div className={cn('createdAt')}>{date}</div>
          </div>
        </div>
        <div className={cn('feed-card-content')}>{content}</div>
        <div className={cn('feed-card-interaction')}>
          <div className={cn('interaction-wrapper')}>
            <div className={cn('interaction-emoji')}>
              <div className={cn('emoji-wrapper')}>
                <Image
                  width={18}
                  height={18}
                  src="/images/emoji.svg"
                  alt="emoji"
                />
                <span>{emojiCount}</span>
              </div>
            </div>
            <div className={cn('interaction-comment')}>
              <div className={cn('comment-wrapper')}>
                <Image
                  width={18}
                  height={18}
                  src="/images/comment.svg"
                  alt="comment"
                />
                <span>{commentCount}</span>
              </div>
            </div>
            <div className={cn('interaction-eye')}>
              <div className={cn('eye-wrapper')}>
                <Image width={18} height={18} src="/images/eye.svg" alt="eye" />
                <span>{eyeCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
