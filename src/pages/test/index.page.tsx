import { ContainerOptionType } from '@/@types/type';
import ContentContainer from '@/components/Common/ContentContainer';
import LoginModal from '@/components/Common/LoginModal';
import AuthForm from '@/components/Profile/AuthForm';

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
