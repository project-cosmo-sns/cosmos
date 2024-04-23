import styles from './FeedCardList.module.scss';
import classNames from 'classnames/bind';
import FeedCard from '@/components/Feed/FeedCard/index';
import { useState } from 'react';
import { MOCKDATA } from './mockData';
import FeedDetails from '../FeedDetails';
import Modal from '@/components/Common/Layout/Modal';

export default function FeedCardList() {
  const cn = classNames.bind(styles);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className={cn('container')}>
        {MOCKDATA.map((feed) => (
          <FeedCard
            key={feed.id}
            feedData={feed}
            modalVisible={isModalOpen}
            toggleModal={setIsModalOpen}
            hasPadding
          />
        ))}
      </div>
      <Modal
        toggleModal={setIsModalOpen}
        modalVisible={isModalOpen}
        cssModalSize={cn('feed-detail-modalSize')}
        cssComponentDisplay={cn('feed-detail-componentDisplay')}
      >
        <FeedDetails />
      </Modal>
    </>
  );
}
