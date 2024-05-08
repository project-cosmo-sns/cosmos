import { useState } from 'react';
import classNames from 'classnames/bind';
import FeedDetails from '@/components/Feed/FeedDetails/index';
import FeedCard from '@/components/Feed/FeedCard/index';
import Modal from '@/components/Common/Layout/Modal';
import styles from '@/components/Feed/FeedList/FeedList.module.scss';
import { FeedDetailType } from '@/components/Feed/types';

interface MyFeedListType {
  feedList: FeedDetailType[];
}

export default function MyFeedList({ feedList }: MyFeedListType) {
  const cn = classNames.bind(styles);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [feedId, setFeedId] = useState<number>(0);

  const handleClick = (selectedFeedId: number) => {
    setFeedId(selectedFeedId);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={cn('container')}>
        {feedList?.map((item) => (
          <FeedCard
            key={item.feed.id}
            feedData={item}
            modalVisible={isModalOpen}
            toggleModal={setIsModalOpen}
            hasPadding
            forDetails={false}
            onClick={() => handleClick(item.feed.id)}
          />
        ))}
      </div>
      <Modal
        toggleModal={setIsModalOpen}
        modalVisible={isModalOpen}
        cssModalSize={cn('feed-detail-modalSize')}
        cssComponentDisplay={cn('feed-detail-componentDisplay')}
      >
        <FeedDetails feedId={feedId} />
      </Modal>
    </>
  );
}
