import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddContentPopOver from '../../AddContentPopOver';
import Notification from '@/components/Common/Layout/Notification';
import {
  HomeIcon,
  BellIcon,
  UserIcon,
  AddIcon,
} from '@/components/Common/IconCollection';
import { useRouter } from 'next/router';
import { useGetProfileImage } from '@/api/member';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from '@/redux/loginModalSlice';
import { RootState } from '@/redux/store';
import { login, logout } from '@/redux/logoutSlice';
import { useFetchMemberStatus } from '@/hooks/useFetchMemberStatus';
import { handleCreateFeedModal } from '@/redux/createFeedModalSlice';
import { handleFeedDetailModal } from '@/redux/feedDetailModalSlice';
import CreateFeed from '@/components/Feed/CreateFeed';
import Modal from '@/components/Common/Layout/Modal';
import { handleEditProfileModal } from '@/redux/editProfileModalSlice';

const cn = classNames.bind(styles);

export default function SideBar() {
  const [activePopover, setActivePopover] = useState<'add' | 'bell' | null>(
    null,
  );
  const [userImage, setUserImage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: member } = useGetProfileImage();
  const isLogin = member?.isLogin;
  const loggedin = useSelector((state: RootState) => state.logout.isLoggedIn);
  const isCreateFeedModalOpen = useSelector(
    (state: RootState) => state.createFeedModal.isOpen,
  );
  const isFeedDetailModalOpen = useSelector(
    (state: RootState) => state.feedDetailModal.isDetailOpen,
  );

  const isModalOpen = isCreateFeedModalOpen;

  const { checkMemberStatus } = useFetchMemberStatus();

  const profileClick = () => {
    if (isLogin) {
      dispatch(handleCreateFeedModal(false));
      dispatch(handleFeedDetailModal(false));
      dispatch(handleEditProfileModal(false));
      router.push('/profile?tab=feed');
    } else {
      dispatch(openLoginModal());
    }
  };

  const togglePopOver = (
    e: React.MouseEvent<HTMLElement>,
    popOverType: 'add' | 'bell',
  ) => {
    e.stopPropagation();
    checkMemberStatus(() =>
      setActivePopover((prevPopover) =>
        prevPopover === popOverType ? null : popOverType,
      ),
    );
  };

  const handleClosePopOver = () => {
    setActivePopover(null);
  };

  const handleCreateFeedClick = (state: boolean) => {
    // 피드 상세 모달 On -> 피드 작성하기 -> 피드 상세 모달 Off -> 피드 작성 모달 On
    if (isFeedDetailModalOpen) {
      dispatch(handleFeedDetailModal(false));
    }
    dispatch(handleCreateFeedModal(state));
    handleClosePopOver();
  };

  const handleHomeIconClick = () => {
    dispatch(handleCreateFeedModal(false));
    dispatch(handleFeedDetailModal(false));
    dispatch(handleEditProfileModal(false));
  };

  useEffect(() => {
    if (!isLogin) {
      dispatch(logout());
      return;
    }
    setUserImage(member?.profileImageUrl);
    dispatch(login());
  }, [isLogin]);

  return (
    <div className={cn('sideBar-container')}>
      <div className={cn('icon-wrapper')}>
        <Link
          // className={cn(isModalOpen && 'disabled')}
          // aria-disabled={isModalOpen}
          // tabIndex={isModalOpen ? -1 : undefined}
          href="/"
          onClick={() => handleHomeIconClick()}
        >
          <HomeIcon fill="#FFFFFF" />
        </Link>
        <div
          className={cn('icon-box', 'add-icon')}
          onClick={(e) => togglePopOver(e, 'add')}
        >
          <AddIcon width="32px" height="32px" />
          {activePopover === 'add' && (
            <AddContentPopOver onClose={handleClosePopOver} />
          )}
        </div>
        <div
          className={cn('icon-box')}
          onClick={(e) => togglePopOver(e, 'bell')}
        >
          <BellIcon fill="#FFFFFF" />
          {activePopover === 'bell' && (
            <Notification onClose={handleClosePopOver} />
          )}
        </div>
        {loggedin ? (
          <Image
            src={userImage || '/images/profile.svg'}
            alt="profile"
            width={32}
            height={32}
            onClick={profileClick}
          />
        ) : (
          <UserIcon fill="#FFFFFF" onClick={profileClick} />
        )}
      </div>
      <Modal
        title="피드 생성"
        modalVisible={isModalOpen}
        toggleModal={handleCreateFeedClick}
        cssModalSize={cn('create-feed-modalSize')}
        cssComponentDisplay={cn('')}
        className="forFeed"
      >
        <CreateFeed modalVisible={isModalOpen} profileImage={userImage} />
      </Modal>
    </div>
  );
}
