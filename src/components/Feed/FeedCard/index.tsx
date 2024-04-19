import Image from 'next/image';
import TermBadge from '@/components/Common/Badge/TermBadge';
import styles from './FeedCard.module.scss';
import classNames from 'classnames/bind';

interface FeedCardTypes {
  userImage: string;
  userName: string;
  term: number;
  date: string;
  content: string;
  image?: string;
  emojiCount: number;
  commentCount: number;
  eyeCount: number;
}

const cn = classNames.bind(styles);

export default function FeedCard({
  userImage = '',
  userName = '',
  term = 0,
  date = '',
  image = '',
  content = '',
  emojiCount = 0,
  commentCount = 0,
  eyeCount = 0,
}: FeedCardTypes) {
  return (
    <div className={cn('feed-card-container')}>
      <div className={cn('feed-card-wrapper')}>
        <div className={cn('feed-card-user')}>
          <div className={cn('user-image')}>
            <Image fill src="/images/profile.svg" alt="user-profile" />
          </div>
          <div className={cn('user-wrapper')}>
            <div className={cn('info')}>
              <div className={cn('name')}>코스모스</div>
              <TermBadge term={3} />
            </div>
            <div className={cn('createdAt')}>2024.4.11</div>
          </div>
        </div>
        <div className={cn('feed-card-content')}>오늘 술 마실 사람?</div>
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
                <span>3</span>
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
                <span>3</span>
              </div>
            </div>
            <div className={cn('interaction-eye')}>
              <div className={cn('eye-wrapper')}>
                <Image width={18} height={18} src="/images/eye.svg" alt="eye" />
                <span>3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
