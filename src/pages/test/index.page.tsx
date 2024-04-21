import Modal from '@/components/Common/Layout/Modal';
import LoginModal from '@/components/Common/LoginModal';
import AuthForm from '@/components/Profile/AuthForm';
import FollowList from '@/components/Profile/FollowList';
import {
  followerData,
  followingData,
} from '@/components/Profile/FollowList/FollowMockData';
import { useState } from 'react';

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
    <div>
      <button type="button" onClick={() => setIsModalOpen(!isModalOpen)}>
        on/off
      </button>
      {isModalOpen && (
        <Modal
          modalVisible={isModalOpen}
          toggleModal={setIsModalOpen}
          title="피드 생성"
        >
          <div
            style={{
              height: '600px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span>모달 컴포넌트</span>
          </div>
        </Modal>
      )}
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
