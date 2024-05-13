import classNames from 'classnames/bind';
import styles from './AddContentPopOver.module.scss';
import { useState } from 'react';
import PopOver from '../PopOverBox';
import Modal from '@/components/Common/Layout/Modal';
import { PostIcon, FeedIcon } from '@/components/Common/IconCollection';
import CreateFeed from '@/components/Feed/CreateFeed';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/router';

type PopOverProps = {
  onClose: () => void;
  profileImage: string | null;
};

const cn = classNames.bind(styles);

export default function AddContentPopOver({
  onClose,
  profileImage,
}: PopOverProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { showToastHandler } = useToast();
  const isLogin = useSelector((state: RootState) => state.logout.isLoggedIn);

  const handleCreateFeedClick = () => {
    if (!isLogin) {
      showToastHandler('로그인이 필요한 서비스입니다.', 'warn');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCreatePostClick = () => {
    if (!isLogin) {
      showToastHandler('로그인이 필요한 서비스입니다.', 'warn');
      return;
    }
    onClose();
    router.push('/write');
  };

  return (
    <PopOver onClose={onClose} className={cn('add-popover')}>
      <ul className={cn('content-list-wrapper')}>
        <li
          role="presentation"
          className={cn('content-list', 'feed')}
          onClick={handleCreateFeedClick}
        >
          <FeedIcon width="18" height="18" fill="#FFFFFF" />
          <span>피드 작성하기</span>
        </li>
        <li
          className={cn('content-list', 'post')}
          onClick={handleCreatePostClick}
        >
          <PostIcon width="18" height="18" fill="#FFFFFF" />
          <span className={cn('post-span')}>포스트 작성하기</span>
        </li>
      </ul>
      <Modal
        title="피드 생성"
        modalVisible={isModalOpen}
        toggleModal={setIsModalOpen}
        cssModalSize={cn('create-feed-modalSize')}
        cssComponentDisplay={cn('')}
      >
        <CreateFeed profileImage={profileImage} />
      </Modal>
    </PopOver>
  );
}
