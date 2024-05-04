import styles from './ProfileHeader.module.scss';
import classNames from 'classnames/bind';
import * as Icon from '@/components/Common/IconCollection';
import { MemberDataType } from '@/pages/profile/mockData';
import GenerationBadge from '@/components/Common/GenerationBadge';
import Image from 'next/image';
import { useState } from 'react';
import FollowList from '../FollowList';

interface ProfileHeaderProps {
  memberData: MemberDataType[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const cn = classNames.bind(styles);

export default function ProfileHeader({
  memberData,
  setIsModalOpen,
}: ProfileHeaderProps) {
  // currentUserId는 토큰?으로 받아옴?
  const currentUserId = '1'; // 임시 ID
  const member =
    memberData && memberData.find((user) => user.id === currentUserId);
  const [followModal, setFollowModal] = useState({
    follower: false,
    following: false,
  });

  const toggleModal = (type: 'follower' | 'following') => {
    setFollowModal({
      ...followModal,
      [type]: !followModal[type],
    });
  };

  return (
    <div className={cn('header-container')}>
      <div className={cn('profile-image')}>
        {member ? (
          <Image
            src={member.imageUrl}
            alt="프로필 이미지"
            width="86"
            height="86"
          />
        ) : (
          <Icon.ProfileIcon width="86" height="86" />
        )}
      </div>
      <div className={cn('profile-middle-section')} />
      <div className={cn('profile-information')}>
        <div className={cn('profile-name-section')}>
          {member ? member.nickname : '게스트'}
          <div className={cn('generation-badge')}>
            <GenerationBadge generationInfo={member?.generation} />
          </div>
        </div>
        <div className={cn('profile-following-section')}>
          {/* 팔로워/팔로잉 데이터.length-1이 팔로워수 */}
          {/* <button type="button" onClick={() => toggleModal('follower')}>
            <span>팔로워</span>
            {followerData.length}
          </button>
          {followModal.follower && (
            <FollowList
              followListProps={{
                title: '팔로워',
                toggleModal: () => toggleModal('follower'),
                followData: followerData,
                isFollow: false,
                modalVisible: followModal.follower,
              }}
            />
          )} */}
          <button type="button" onClick={() => toggleModal('following')}>
            <span>팔로잉</span>
            {/* {followingData.length} */}
          </button>
          {followModal.following && (
            <FollowList
              followListProps={{
                title: '팔로잉',
                toggleModal: () => toggleModal('following'),
                // followData: followingData,
                isFollow: true,
                modalVisible: followModal.following,
              }}
            />
          )}
        </div>
      </div>
      <div className={cn('profile-introduce-section')}>
        {member ? member.introduce : '소개가 없습니다.'}
      </div>
      {member ? (
        <div
          onClick={() => setIsModalOpen((prev) => !prev)}
          className={cn('profile-setting-button')}
        >
          <Icon.SettingIcon width="18" height="18" fill="#C2C7D9" />
        </div>
      ) : (
        <div className={cn('profile-setting-button')}>
          <button
            type="button"
            onClick={() => {
              console.log('인증모달띄우기');
            }}
          >
            인증하기
          </button>
        </div>
      )}
    </div>
  );
}
