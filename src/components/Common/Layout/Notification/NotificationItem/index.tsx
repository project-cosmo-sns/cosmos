import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { ProfileIconDark, CheckIcon } from '@/components/Common/IconCollection';
import Image from 'next/image';
import { NotificationData, notificationType } from '../type';
import getElapsedTime from '@/utils/getElaspedTime';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from '@/components/Common/Layout/Modal';
import FeedDetails from '@/components/Feed/FeedDetails/index';
import instance from '@/api/axios';

const cn = classNames.bind(styles);

type NotificationItemProps = {
  data: NotificationData;
};

export default function NotificationItem({ data }: NotificationItemProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    sendMember,
    notification: {
      id,
      content,
      notificationType: { type, feedId, postId },
      isConfirmed,
      createdAt,
    },
  } = data;

  const router = useRouter();

  const confirmNotification = async () => {
    try {
      const response = await instance.post(`/notification/${id}/confirm`);
      console.log('알림이 확인되었습니다.');
    } catch (error) {
      console.error('알림 확인 중 오류가 발생했습니다.', error);
    }
  };

  const handleNotificationClick = () => {
    if (!isConfirmed) {
      confirmNotification();
    }

    if (type === notificationType.CREATE_POST_COMMENT) {
      router.push(`/post/${postId}`);
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
          <Image
            src={sendMember.profileImageUrl}
            alt="프로필 이미지"
            width={40}
            height={40}
            className={cn('profile-image')}
          />
        ) : (
          <ProfileIconDark width="54" height="54" />
        )}
        <p>
          <strong>{content}</strong>
          <span>{formattedCreatedAt}</span>
        </p>

        {isConfirmed ? (
          <span className={cn('notification-confirm')}>
            <CheckIcon fill="#fff" width="13" height="9.5" />
          </span>
        ) : (
          <span className={cn('notification-dot')} />
        )}
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
