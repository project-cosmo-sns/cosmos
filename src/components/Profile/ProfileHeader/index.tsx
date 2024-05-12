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
import AuthForm from '../AuthForm';
import ProfilePopOver from '@/components/Common/ProfilePopOver';
import { logout } from '@/redux/logoutSlice';
import { useDispatch } from 'react-redux';
import { memberLogout } from '@/api/member';
import router from 'next/router';

export interface ProfileHeaderProps {
  memberData: MemberDataType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memberId?: string;
}

const cn = classNames.bind(styles);

export default function ProfileHeader({
  memberData,
  setIsModalOpen,
}: ProfileHeaderProps) {
  const [followModal, setFollowModal] = useState({
    follower: false,
    following: false,
    authForm: false,
  });

  const memberId = memberData?.memberId;

  const { isActive, toggleFollow } = useFollowClick(memberId);

  const toggleModal = (type: 'follower' | 'following' | 'authForm') => {
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
    // 테스트용 (memberData.isAuthorized) 으로 바꿔줘야함
    if (memberData.isAuthorized) {
      console.log('memberData:', memberData);
      return (
        <div className={cn('profile-setting-button')}>
          <ProfilePopOver onSetting={() => setIsModalOpen((prev) => !prev)} />
        </div>
      );
      // 테스트용 (!memberData.isAuthorized) 으로 바꿔줘야함
    }
    return (
      <button
        type="button"
        onClick={() => toggleModal('authForm')}
        className={cn('authorization-button')}
      >
        인증하기
      </button>
    );
  };

  function introduceContent() {
    // 테스트용 (memberData.isAuthorized) 으로 바꿔줘야함
    if (!memberData.isAuthorized) {
      return (
        <div className={cn('introduce-empty')}>인증되지 않은 사용자입니다.</div>
      );
    }
    if (memberData.introduce === '') {
      return <div className={cn('introduce-empty')}>소개가 없습니다.</div>;
    }
    return memberData.introduce;
  }

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
          {memberData.isAuthorized ? memberData.nickname : '미인증'}
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
                followData: memberData.memberId ? 'userFollower' : 'follower',
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
                followData: memberData.memberId ? 'userFollowing' : 'following',
                isFollowButton: true,
                modalVisible: followModal.following,
              }}
            />
          )}
        </div>
      </div>
      <div className={cn('profile-introduce-section')}>
        {introduceContent()}
      </div>
      <div className={cn('profile-setting-or-following')}>{renderButton()}</div>
      {followModal.authForm && (
        <AuthForm
          modalVisible={followModal.authForm}
          toggleModal={() => toggleModal('authForm')}
        />
      )}
    </div>
  );
}
