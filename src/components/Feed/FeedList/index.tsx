import Modal from '@/components/Common/Layout/Modal';
import FeedCard from '@/components/Feed/FeedCard/index';
import FeedDetails from '@/components/Feed/FeedDetails/index';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FeedListType } from '../types';
import styles from './FeedList.module.scss';
import fetchData from '@/api/fetchData';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
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

  const initialData: InfiniteData<FeedListType> = {
    pages: [feedList], // 초기 데이터가 들어있는 페이지 배열
    pageParams: [1], // 초기 데이터의 페이지 매개변수 배열
  };

  const {
    data: feedListData,
    ref,
    isFetchingNextPage,
  } = useInfiniteScroll<FeedListType>({
    queryKey: ['feedList'],
    fetchFunction: (pageParam) =>
      fetchData({
        param: `feed/list?order=DESC&page=${pageParam}&take=10`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    initialData,
  });

  const feedPages = feedListData?.pages ?? [];

  return (
    <>
      <div className={cn('container')}>
        {feedPages.map((feedPage) =>
          feedPage.data.map((feed) => (
            <FeedCard
              key={feed.feed.id}
              feedData={feed}
              hasPadding
              forDetails={false}
              onClick={() => handleClick(feed.feed.id)}
            />
          )),
        )}
      </div>
      {!isFetchingNextPage && <div ref={ref} />}
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
