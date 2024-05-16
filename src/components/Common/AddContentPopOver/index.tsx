import classNames from 'classnames/bind';
import styles from './AddContentPopOver.module.scss';
import { useEffect, useState } from 'react';
import PopOver from '../PopOverBox';
import Modal from '@/components/Common/Layout/Modal';
import { PostIcon, FeedIcon } from '@/components/Common/IconCollection';
import CreateFeed from '@/components/Feed/CreateFeed';
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

  const handleCreateFeedClick = () => {
    setIsModalOpen(true);
  };

  const handleCreatePostClick = () => {
    router.push('/write');
    onClose();
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
        <CreateFeed
          toggleModal={setIsModalOpen}
          modalVisible={isModalOpen}
          profileImage={profileImage}
        />
      </Modal>
    </PopOver>
  );
}
