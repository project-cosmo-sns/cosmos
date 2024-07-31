import { SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import FeedDetails from '@/components/Feed/FeedDetails/index';
import FeedCard from '@/components/Feed/FeedCard/index';
import Modal from '@/components/Common/Layout/Modal';
import styles from '@/components/Feed/FeedList/FeedList.module.scss';
import { FeedListType } from '@/components/Feed/types';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import fetchData from '@/api/fetchData';
import { MemberDataType } from '@/pages/profile/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { handleFeedDetailModal } from '@/redux/feedDetailModalSlice';
import { handleCreateFeedModal } from '@/redux/createFeedModalSlice';

interface FeedListProps {
  feedList: FeedListType;
  memberData: MemberDataType;
}

export default function MyFeedList({ feedList, memberData }: FeedListProps) {
  const cn = classNames.bind(styles);
  const [feedId, setFeedId] = useState<number>(0);
  const dispatch = useDispatch();
  const isFeedDetailOpen = useSelector(
    (state: RootState) => state.feedDetailModal.isDetailOpen,
  );
  const setIsFeedDetailModalOpen = (state: boolean) => {
    dispatch(handleFeedDetailModal(state));
  };

  const handleClick = (selectedFeedId: number) => {
    setFeedId(selectedFeedId);
    setIsFeedDetailModalOpen(true);
  };

  const memberId = memberData?.memberId ?? 'mine';

  const endpoint = `/profile/${memberId}/feed?order=DESC`;

  const {
    data: feedListData,
    ref,
    refetch,
    isFetchingNextPage,
    isPending,
  } = useInfiniteScroll<FeedListType>({
    queryKey: ['feedList', memberId],
    fetchFunction: (pageParam) =>
      fetchData({
        param: `${endpoint}&page=${pageParam}&take=10`,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const feedDataList = feedListData?.pages ?? [];

  useEffect(() => {
    refetch();
  }, [memberId]);

  return (
    <>
      <div className={cn('container')}>
        {feedDataList?.map((page) =>
          page.data.map((feedDetail) => (
            <FeedCard
              key={feedDetail.feed.id}
              feedData={feedDetail}
              hasPadding
              forDetails={false}
              onClick={() => handleClick(feedDetail.feed.id)}
              editState={false}
            />
          )),
        )}
        {!isFetchingNextPage && <div ref={ref} />}
      </div>
      <Modal
        toggleModal={setIsFeedDetailModalOpen}
        modalVisible={isFeedDetailOpen}
        cssModalSize={cn('feed-detail-modalSize')}
        cssComponentDisplay={cn('feed-detail-componentDisplay')}
        className="forFeed"
      >
        <FeedDetails feedId={feedId} />
      </Modal>
    </>
  );
}
