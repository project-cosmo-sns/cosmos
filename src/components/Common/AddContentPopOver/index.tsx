import classNames from 'classnames/bind';
import styles from './AddContentPopOver.module.scss';
import { useState } from 'react';
import PopOver from '../PopOverBox';
import Modal from '@/components/Common/Layout/Modal';
import { PostIcon, FeedIcon } from '@/components/Common/IconCollection';
import CreateFeed from '@/components/Feed/CreateFeed';
import Link from 'next/link';

type PopOverProps = {
  onClose: () => void;
};

const cn = classNames.bind(styles);

export default function AddContentPopOver({ onClose }: PopOverProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <PopOver onClose={onClose} className={cn('add-popover')}>
      <ul className={cn('content-list-wrapper')}>
        <li
          role="presentation"
          className={cn('content-list')}
          onClick={() => setIsModalOpen(true)}
        >
          <FeedIcon width="18" height="18" fill="#FFFFFF" />
          <span>피드 작성하기</span>
        </li>
        <li className={cn('content-list')}>
          <PostIcon width="18" height="18" fill="#FFFFFF" />
          <Link href="/write">
            <span className={cn('post-span')}>포스트 작성하기</span>
          </Link>
        </li>
      </ul>
      <Modal
        title="피드 생성"
        modalVisible={isModalOpen}
        toggleModal={setIsModalOpen}
        cssModalSize={cn('create-feed-modalSize')}
        cssComponentDisplay={cn('')}
      >
        <CreateFeed />
      </Modal>
    </PopOver>
  );
}
