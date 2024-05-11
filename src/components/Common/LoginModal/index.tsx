import styles from './LoginModal.module.scss';
import classNames from 'classnames/bind';
import Modal from '../Layout/Modal';
import { GitHubIcon, GoogleIcon, LogoIcon } from '../IconCollection';
import LoginButton from '@/components/Common/Buttons/LoginButton';
import { baseURL } from '@/api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeLoginModal } from '@/redux/loginModalSlice';

const cn = classNames.bind(styles);

export default function LoginModal() {
  const githubClick = async () => {
    let popupX = window.innerWidth / 2 - 300;
    let popupY = window.innerHeight / 2 - 300;

    window.open(
      `${baseURL}/auth/github/login`,
      '_blank',
      `width=600, height=600, top=${popupY}, left=${popupX}`,
    );
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
        <h2>코스모스에 오신 것을 환영합니다!🙌</h2>
        <div className={cn('oauth-wrapper')}>
          <LoginButton text="구글 로그인/ 회원가입" icon={<GoogleIcon />} />
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
