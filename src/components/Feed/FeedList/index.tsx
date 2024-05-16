import Modal from '@/components/Common/Layout/Modal';
import FeedCard from '@/components/Feed/FeedCard/index';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import FeedDetails from '@/components/Feed/FeedDetails/index';
import { SortType } from '@/constants/sortType';
import { CATEGORY_LIST } from '@/constants/categoryList';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FeedListType } from '../types';
import styles from './FeedList.module.scss';
import fetchData from '@/api/fetchData';
import { InfiniteData } from '@tanstack/react-query';
import { useFetchMemberStatus } from '@/hooks/useFetchMemberStatus';
/**
 * @return {JSX.Element} FeedCardList - 추후에 변경 예정입니다. 지금은 목데이터를 화면에 출력하지만 변경한다면 상위 컴포넌트에서 피드 데이터를 받아서 뿌려줄 예정입니다.
 */

interface FeedListProps {
  feedList: FeedListType;
  selectedSort: SortType;
}

const cn = classNames.bind(styles);

export default function FeedList({ feedList, selectedSort }: FeedListProps) {
  const { checkMemberStatus } = useFetchMemberStatus();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const queryParam = CATEGORY_LIST[selectedCategory]
    ? `&category=${selectedCategory}`
    : '';
  const [feedId, setFeedId] = useState<number>(0);
  const handleClick = (selectedFeedId: number) => {
    setFeedId(selectedFeedId);
    setIsModalOpen(!isModalOpen);
  };

  const initialData: InfiniteData<FeedListType> = {
    pages: [feedList], // 초기 데이터가 들어있는 페이지 배열.
    pageParams: [1], // 초기 데이터의 페이지 매개변수 배열.
  };

  const {
    data: feedListData,
    ref,
    isFetchingNextPage,
    refetch,
  } = useInfiniteScroll<FeedListType>({
    queryKey: ['feedList'],
    fetchFunction: (pageParam) =>
      fetchData({
        param: `feed/list?order=DESC&page=${pageParam}&take=10&sortBy=${selectedSort}${queryParam}`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    initialData,
  });

  const feedPages = feedListData?.pages ?? [];

  useEffect(() => {
    refetch();
  }, [selectedCategory, selectedSort]);

  return (
    <>
      <div className={cn('container')}>
        {feedPages[0].data.length ? (
          feedPages.map((feedPage) =>
            feedPage.data.map((feed) => (
              <FeedCard
                key={feed.feed.id}
                feedData={feed}
                hasPadding
                forDetails={false}
                onClick={() =>
                  checkMemberStatus(() => handleClick(feed.feed.id))
                }
              />
            )),
          )
        ) : (
          <div className={cn('no-feed')}>피드가 없습니다</div>
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
