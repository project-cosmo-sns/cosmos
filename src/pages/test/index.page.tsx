import { ContainerOptionType } from '@/@types/type';
import ContentContainer from '@/components/Common/ContentContainer';
import LoginModal from '@/components/Common/LoginModal';
import AuthForm from '@/components/Profile/AuthForm';
import FollowList from '@/components/Profile/FollowList';
import { followerData, followingData } from '@/utils/MemberMockData';
import { useState } from 'react';

export default function TestPage() {
  const [selectedOption, setSelectedOption] =
    useState<ContainerOptionType>('hashtag');

  const [followModal, setFollowModal] = useState({
    follower: false,
    following: false,
    authForm: false,
    login: false,
  });

  const toggleModla = (
    type: 'follower' | 'following' | 'authForm' | 'login',
  ) => {
    setFollowModal({
      ...followModal,
      [type]: !followModal[type],
    });
  };
  return (
    <div style={{ width: '100%' }}>
      <ContentContainer
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        keyword="이유연"
      >
        {selectedOption === 'hashtag' ? <>해시태그</> : <>유저</>}
      </ContentContainer>
      <br />
      <button type="button" onClick={() => toggleModla('follower')}>
        팔로워
      </button>
      {followModal.follower && (
        <FollowList
          followListProps={{
            title: '팔로워',
            toggleModal: () => toggleModla('follower'),
            followData: followerData,
            isFollow: false,
            modalVisible: followModal.follower,
          }}
        />
      )}
      <br />
      <button type="button" onClick={() => toggleModla('following')}>
        팔로잉
      </button>
      {followModal.following && (
        <FollowList
          followListProps={{
            title: '팔로잉',
            toggleModal: () => toggleModla('following'),
            followData: followingData,
            isFollow: true,
            modalVisible: followModal.following,
          }}
        />
      )}
      <br />
      <button type="button" onClick={() => toggleModla('authForm')}>
        회원인증
      </button>
      {followModal.authForm && (
        <AuthForm
          modalVisible={followModal.authForm}
          toggleModal={() => toggleModla('authForm')}
        />
      )}
      <br />
      <button type="button" onClick={() => toggleModla('login')}>
        회원가입 모달 테스트 
      </button>
      {followModal.login && (
        <LoginModal
          modalVisible={followModal.login}
          toggleModal={() => toggleModla('login')}
        />
      )}
    </div>
  );
}
