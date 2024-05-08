import styles from './ProfileHeader.module.scss';
import classNames from 'classnames/bind';
import * as Icon from '@/components/Common/IconCollection';
import { MemberDataType } from '@/pages/profile/types';
import GenerationBadge from '@/components/Common/GenerationBadge';
import Image from 'next/image';
import { useState } from 'react';
import FollowList from '../FollowList';
import useFollowClick from '@/hooks/useFollowClick';
import FollowButton from '@/components/Common/Buttons/FollowButton';

export interface ProfileHeaderProps {
  memberData: MemberDataType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memberId?: string;
}

const cn = classNames.bind(styles);

export default function ProfileHeader({
  memberData,
  setIsModalOpen,
  // error,
}: ProfileHeaderProps) {
  const [followModal, setFollowModal] = useState({
    follower: false,
    following: false,
  });
  const memberId = memberData?.memberId ?? 0;
  const { isActive, toggleFollow } = useFollowClick(memberId);

  const toggleModal = (type: 'follower' | 'following') => {
    setFollowModal({
      ...followModal,
      [type]: !followModal[type],
    });
  };

  const renderButton = () => {
    if (memberData.memberId) {
      return (
        <FollowButton
          onClick={toggleFollow}
          isFollowButton
          isActive={isActive}
        />
      );
    }
    if (memberData.isAuthorized) {
      return (
        <div
          onClick={() => setIsModalOpen((prev) => !prev)}
          className={cn('profile-setting-button')}
        >
          <Icon.SettingIcon width="18" height="18" fill="#C2C7D9" />
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => {
          console.log('인증모달띄우기');
        }}
      >
        인증하기
      </button>
    );
  };

  return (
    <div className={cn('header-container')}>
      <div className={cn('profile-image')}>
        {memberData.profileImageUrl ? (
          <Image
            src={memberData.profileImageUrl}
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
          {memberData ? memberData.nickname : '게스트'}
          <div className={cn('generation-badge')}>
            <GenerationBadge
              generationInfo={memberData?.generation}
              isAuthorized={memberData?.isAuthorized}
            />
          </div>
        </div>
        <div className={cn('profile-following-section')}>
          <button type="button" onClick={() => toggleModal('follower')}>
            <span>팔로워</span>
            {memberData && memberData.followerCount}
          </button>
          {followModal.follower && (
            <FollowList
              followListProps={{
                title: '팔로워',
                toggleModal: () => toggleModal('follower'),
                followData: 'follower',
                isFollowButton: false,
                modalVisible: followModal.follower,
              }}
            />
          )}
          <button type="button" onClick={() => toggleModal('following')}>
            <span>팔로잉</span>
            {memberData && memberData.followingCount}
          </button>
          {followModal.following && (
            <FollowList
              followListProps={{
                title: '팔로잉',
                toggleModal: () => toggleModal('following'),
                followData: 'following',
                isFollowButton: true,
                modalVisible: followModal.following,
              }}
            />
          )}
        </div>
      </div>
      <div className={cn('profile-introduce-section')}>
        {memberData.introduce ? (
          memberData.introduce
        ) : (
          <div className={cn('introduce-empty')}>소개가 없습니다.</div>
        )}
      </div>

      <div className={cn('profile-setting-or-following')}>{renderButton()}</div>
    </div>
  );
}
