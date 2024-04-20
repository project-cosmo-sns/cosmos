import classNames from 'classnames/bind';
import styles from './AddContentPopOver.module.scss';
import { useState } from 'react';
import PopOver from '../PopOverBox';
import Modal from '@/components/Common/Layout/Modal';
import { PostIcon, FeedIcon } from '@/components/Common/IconCollection';
import CreateFeed from '@/components/Feed/CreateFeed';

type PopOverProps = {
  popOverRef: React.RefObject<HTMLDivElement>;
};

const cn = classNames.bind(styles);

export default function AddContentPopOver({ popOverRef }: PopOverProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <PopOver popOverRef={popOverRef}>
      <ul>
        <li
          role="presentation"
          className={cn('content-list')}
          onClick={() => setIsModalOpen(true)}
        >
          <FeedIcon />
          <span>피드 작성하기</span>
        </li>
        <li className={cn('content-list')}>
          <PostIcon />
          <span>포스트 작성하기</span>
        </li>
      </ul>
      {isModalOpen && (
        <Modal
          modalVisible={isModalOpen}
          toggleModal={setIsModalOpen}
          title="피드 생성"
        >
          <CreateFeed />
        </Modal>
      )}
    </PopOver>
  );
}
