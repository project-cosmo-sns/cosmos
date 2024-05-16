import styles from './LoginModal.module.scss';
import classNames from 'classnames/bind';
import Modal from '../Layout/Modal';
import { GitHubIcon, GoogleIcon, LogoIcon } from '../IconCollection';
import LoginButton from '@/components/Common/Buttons/LoginButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeLoginModal } from '@/redux/loginModalSlice';
import openAuthPopup from '@/utils/openAuthPopup';

const cn = classNames.bind(styles);

export default function LoginModal() {
  const githubClick = async () => {
    await openAuthPopup('github');
  };

  const googleClick = async () => {
    await openAuthPopup('google');
  };

  const isModalVisible = useSelector(
    (state: RootState) => state.loginModal.loginModalOpen,
  );

  const dispatch = useDispatch();

  const closedModals = () => {
    dispatch(closeLoginModal());
  };

  return (
    <Modal
      modalVisible={isModalVisible}
      toggleModal={closedModals}
      cssModalSize={cn('login-container')}
      cssComponentDisplay={cn('login-wrapper')}
    >
      <div className={cn('header-wrapper')}>
        <LogoIcon width="105" height="30" />
        <h2>
          코드잇 스프린터가 모인 SNS
          <br />
          코스모스에 오신 것을 환영합니다 🤗
        </h2>
        <div className={cn('oauth-wrapper')}>
          <LoginButton
            text="구글 로그인/ 회원가입"
            icon={<GoogleIcon />}
            onClick={googleClick}
          />
          <LoginButton
            text="깃허브 로그인/ 회원가입"
            icon={<GitHubIcon fill="#FFFFFF" />}
            onClick={githubClick}
          />
        </div>
      </div>
    </Modal>
  );
}
