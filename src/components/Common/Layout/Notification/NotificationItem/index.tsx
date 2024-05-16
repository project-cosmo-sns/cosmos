import fetchData from '@/api/fetchData';
import { CheckIcon } from '@/components/Common/IconCollection';
import Modal from '@/components/Common/Layout/Modal';
import FeedDetails from '@/components/Feed/FeedDetails/index';
import getElapsedTime from '@/utils/getElaspedTime';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NotificationData, notificationType } from '../type';
import styles from './NotificationItem.module.scss';

const cn = classNames.bind(styles);

type NotificationItemProps = {
  data: NotificationData;
  handleClosePopOver: () => void;
};

export default function NotificationItem({
  data,
  handleClosePopOver,
}: NotificationItemProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    sendMember,
    notification: {
      id,
      content,
      notificationType: {
        type,
        feedId,
        postId,
        followingMemberId,
        // isFollowing,
      },
      isConfirmed,
      createdAt,
    },
  } = data;

  const mutation = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/notification/${id}/confirm`,
        method: 'post',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
    onError: (error: Error) => {
      console.error('알림 확인 중 오류가 발생했습니다.', error);
    },
  });

  const handleNotificationClick = () => {
    if (!isConfirmed) {
      mutation.mutate();
    }

    if (type === notificationType.FOLLOW) {
      router.push(`/profile?memberId=${followingMemberId}`);
      handleClosePopOver();
    }

    if (
      type === notificationType.CREATE_POST_COMMENT ||
      type === notificationType.CREATE_POST_EMOJI
    ) {
      router.push(`/post/${postId}`);
      handleClosePopOver();
    }

    if (
      type === notificationType.CREATE_FEED_COMMENT ||
      type === notificationType.CREATE_FEED_EMOJI
    ) {
      setIsModalOpen(true);
    }
  };

  const formattedCreatedAt = getElapsedTime(createdAt);

  const onErrorImg: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement;
    target.src = '/images/profile.svg';
  };

  // 같은 유저로부터 팔로우 요청이 여러번 오면 하나로 통합되는게 아니라 여러 개가 오고있어서 임시로 주석처리.
  // const { isActive, toggleFollow } = useFollowClick(
  //   followingMemberId,
  //   isFollowing,
  // );

  return (
    <>
      <div
        className={cn('notification-item')}
        onClick={handleNotificationClick}
      >
        <Image
          src={sendMember?.profileImageUrl || '/images/profile.svg'}
          onError={onErrorImg}
          alt="프로필 이미지"
          width={40}
          height={40}
          className={cn('profile-image')}
        />
        <p>
          <strong>{content}</strong>
          <span>{formattedCreatedAt}</span>
        </p>
        {/* {type === notificationType.FOLLOW && (
          <FollowButton
            onClick={toggleFollow}
            isActive={isActive}
            isFollowButton
          />
        )} */}
        {isConfirmed ? (
          <span className={cn('notification-confirm')}>
            <CheckIcon fill="#fff" width="13" height="9.5" />
          </span>
        ) : (
          <span className={cn('notification-dot')} />
        )}
      </div>
      {isModalOpen && feedId && (
        <Modal
          toggleModal={() => setIsModalOpen(false)}
          modalVisible={isModalOpen}
          cssModalSize={cn('feed-detail-modalSize')}
          cssComponentDisplay={cn('feed-detail-componentDisplay')}
        >
          <FeedDetails feedId={feedId} />
        </Modal>
      )}
    </>
  );
}
