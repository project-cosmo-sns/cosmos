import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { ProfileIconDark } from '@/components/Common/IconCollection';
import Image from 'next/image';

const cn = classNames.bind(styles);

// 임시 타입
type Notification = {
  author: {
    nickname: string;
    profileImage: string | null;
  };
  text: string;
  createdAt: string;
  isRead: boolean;
};

type NotificationItemProps = {
  data: Notification;
};

export default function NotificationItem({ data }: NotificationItemProps) {
  const {
    author: { nickname, profileImage },
    text,
    createdAt,
    isRead,
  } = data;
  return (
    // 날짜 관련은 데이터 들어오는것 보고...! 추가로 수정하겠습니다
    <div className={cn('notification-item')}>
      {profileImage ? (
        <Image src="profileImage" alt="프로필 이미지" />
      ) : (
        <ProfileIconDark width="54" height="54" />
      )}
      <p>
        <strong>{nickname}</strong>님이 {text} 했습니다.
        <span>{createdAt}</span>
      </p>
      <span className={cn('notification-dot', { isRead })} />
    </div>
  );
}
