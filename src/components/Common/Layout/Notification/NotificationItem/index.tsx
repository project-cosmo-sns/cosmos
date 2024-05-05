import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { ProfileIconDark } from '@/components/Common/IconCollection';
import Image from 'next/image';
import { NotificationData } from '../type';
import getElapsedTime from '@/utils/getElaspedTime';

const cn = classNames.bind(styles);

type NotificationItemProps = {
  data: NotificationData;
};

export default function NotificationItem({ data }: NotificationItemProps) {
  const {
    sendMember,
    notification: { content, notificationType, isConfirmed, createdAt },
  } = data;

  // notificationType따른 동작 분기 처리가 필요함. 피드/팔로우...가 들어오면? 해볼까? 임시로 포스트부터 붙여보기.

  const formattedCreatedAt = getElapsedTime(createdAt);

  return (
    <div className={cn('notification-item')}>
      {sendMember.profileImageUrl ? (
        <Image src={sendMember.profileImageUrl} alt="프로필 이미지" />
      ) : (
        <ProfileIconDark width="54" height="54" />
      )}
      <p>
        <strong>{content}</strong>
        <span>{formattedCreatedAt}</span>
      </p>
      <span className={cn('notification-dot', { isConfirmed })} />
    </div>
  );
}
