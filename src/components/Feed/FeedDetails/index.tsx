import { useState, Dispatch, SetStateAction } from 'react';
import CommentCard from '@/components/Common/CommentCard';
import CommentInput from '@/components/Common/CommentInput';
import classNames from 'classnames/bind';
import FeedCard from '@/components/Feed/FeedCard/index';
import fetchData from '@/api/fetchData';
import { useQuery } from '@tanstack/react-query';
import { useCommentRequest } from '@/hooks/useCommentRequest';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import EditFeed from '@/components/Feed/EditFeed/index';
import { FeedDetailType, CommentListType } from '../types';
import styles from './FeedDetails.module.scss';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

/**
 * @return {JSX.Element} FeedDetails - 추후에 변경 예정입니다. 피드 리스트에서 특정 피드를 클릭한다면 클리한 피드의 아이디를 통해 데이터를 요청해 화면에 보여줍니다
 */

export default function FeedDetails({
  feedId,
  setIsNotificationFeedModalOpen,
}: {
  feedId: number;
  setIsNotificationFeedModalOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const cn = classNames.bind(styles);

  const {
    data: feedData,
    isPending: isFeedDataPending,
    isError: isFeedDataError,
    refetch: feedRefetch,
  } = useQuery({
    queryKey: ['feedDetails', feedId],
    queryFn: ({ queryKey }) =>
      fetchData<FeedDetailType>({
        param: `feed/${queryKey[1]}/detail`,
      }),
  });

  const {
    data: commentListData,
    refetch: commentRefetch,
    isPending: isCommentDataPending,
    isError: isCommentDataError,
    isFetchingNextPage,
    ref,
  } = useInfiniteScroll<CommentListType>({
    queryKey: ['feedComments', feedId],
    fetchFunction: (page: number) =>
      fetchData({
        param: `feed/${feedId}/comment/list?order=DESC&page=${page}&take=10`,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
  });

  const {
    postCommentMutate,
    deleteCommentRequest,
    postLikeRequest,
    deleteLikeRequest,
    editCommentRequest,
  } = useCommentRequest(feedId, true, commentRefetch);

  const feed: FeedDetailType = feedData ?? {
    writer: {
      id: 0,
      nickname: '',
      generation: 0,
      profileImageUrl: '',
    },
    feed: {
      id: 0,
      content: '',
      viewCount: 0,
      commentCount: 0,
      emojiCount: 0,
      createdAt: '',
      imageUrls: [],
      isMine: false,
      emojis: [],
    },
  };

  if (isFeedDataPending) return <LoadingSpinner />;
  if (isFeedDataError)
    return '삭제된 피드 입니다. 새로 고침 후 다시 이용해주세요.';
  if (isCommentDataPending) return <LoadingSpinner />;
  if (isCommentDataError) return '코멘트 데이터 에러';

  return (
    <>
      {isEdit ? (
        <EditFeed
          feedData={feed}
          editState={isEdit}
          toggleEditMode={setIsEdit}
          feedContentRefetch={feedRefetch}
        />
      ) : (
        <div className={cn('container')}>
          <FeedCard
            feedData={feed}
            hasPadding={false}
            forDetails
            editState={isEdit}
            toggleEditMode={setIsEdit}
            setIsNotificationFeedModalOpen={setIsNotificationFeedModalOpen}
          />
          <CommentInput mutateFn={postCommentMutate} />
          <div className={cn('comment-list-area')}>
            {commentListData?.pages.map(({ data: commentList }, index) =>
              commentList.length ? (
                commentList.map((comment) => (
                  <div key={comment.comment.id} className={cn('comment-list')}>
                    <CommentCard
                      id={feedId}
                      comment={comment}
                      deleteLikeRequest={deleteLikeRequest}
                      postLikeRequest={postLikeRequest}
                      deleteCommentRequest={deleteCommentRequest}
                      editCommentRequest={editCommentRequest}
                      setIsNotificationFeedModalOpen={
                        setIsNotificationFeedModalOpen
                      }
                    />
                  </div>
                ))
              ) : (
                <div key={index} className={cn('empty-comment')}>
                  <span className={cn('message')}>댓글이 없습니다.</span>
                </div>
              ),
            )}
          </div>
          {!isFetchingNextPage && <div ref={ref} />}
        </div>
      )}
    </>
  );
}
