import Modal from '@/components/Common/Layout/Modal';
import FeedCard from '@/components/Feed/FeedCard/index';
import FeedDetails from '@/components/Feed/FeedDetails/index';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FeedListType } from '../types';
import styles from './FeedList.module.scss';
/**
 * @return {JSX.Element} FeedCardList - 추후에 변경 예정입니다. 지금은 목데이터를 화면에 출력하지만 변경한다면 상위 컴포넌트에서 피드 데이터를 받아서 뿌려줄 예정입니다.
 */

interface FeedListProps {
  feedList: FeedListType;
}

export default function FeedList({ feedList }: FeedListProps) {
  const cn = classNames.bind(styles);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [feedId, setFeedId] = useState<number>(0);
  const handleClick = (selectedFeedId: number) => {
    setFeedId(selectedFeedId);
    setIsModalOpen(!isModalOpen);
  };
  console.log(feedList);

  return (
    <>
      <div className={cn('container')}>
        {feedList.data?.map((item) => (
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
