import { ContainerOptionType } from '@/@types/type';
import ContentContainer from '@/components/Common/ContentContainer';
import LoginModal from '@/components/Common/LoginModal';
import AuthForm from '@/components/Profile/AuthForm';
import { memberLogout } from '@/api/member';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DeleteModal from '@/components/Common/DeleteModal';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/logoutSlice';

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

  const router = useRouter();

  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const memberLogoutClick = async () => {
    const res = await memberLogout();
    dispatch(logout());
    router.push('/');
  };

  const onlogout = () => {
    setDeleteModal(true);
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
      <br />
      <button onClick={onlogout} type="button">
        로그아웃
      </button>
      <DeleteModal
        isDeleteModalOpen={deleteModal}
        setIsDeleteModalOpen={setDeleteModal}
        handleDelete={memberLogoutClick}
        title="로그아웃"
        deleteText="로그아웃"
      />
    </div>
  );
}
