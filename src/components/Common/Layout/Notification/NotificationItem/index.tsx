import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { ProfileIconDark } from '@/components/Common/IconCollection';
import Image from 'next/image';
import { NotificationData, notificationType } from '../type';
import getElapsedTime from '@/utils/getElaspedTime';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from '@/components/Common/Layout/Modal';
import FeedDetails from '@/components/Feed/FeedDetails/index';

const cn = classNames.bind(styles);

type NotificationItemProps = {
  data: NotificationData;
};

export default function NotificationItem({ data }: NotificationItemProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    sendMember,
    notification: {
      content,
      notificationType: { type, feedId, postId },
      isConfirmed,
      createdAt,
    },
  } = data;

  const router = useRouter();

  const handleNotificationClick = () => {
    if (type === notificationType.CREATE_POST_COMMENT) {
      router.push(`/post/${postId}/detail`);
    }

    if (type === notificationType.CREATE_FEED_COMMENT) {
      setIsModalOpen(true);
    }
  };

  const formattedCreatedAt = getElapsedTime(createdAt);

  return (
    <>
      <div
        className={cn('notification-item')}
        onClick={handleNotificationClick}
      >
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
      {type === notificationType.CREATE_FEED_COMMENT && isModalOpen && (
        <Modal
          toggleModal={() => setIsModalOpen(false)}
          modalVisible={isModalOpen}
          cssModalSize={cn('feed-detail-modalSize')}
          cssComponentDisplay={cn('feed-detail-componentDisplay')}
        >
          <FeedDetails feedId={feedId!} />
        </Modal>
      )}
    </>
  );
}
