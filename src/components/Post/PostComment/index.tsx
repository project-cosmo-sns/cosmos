import fetchData from '@/api/fetchData';
import CommentCard from '@/components/Common/CommentCard';
import CommentInput from '@/components/Common/CommentInput';
import { CommentListType } from '@/components/Feed/types';
import { useCommentRequest } from '@/hooks/useCommentRequest';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import classNames from 'classnames/bind';
import styles from './PostComment.module.scss';

interface PostCommentProps {
  postId: number;
}

const cn = classNames.bind(styles);

export default function PostComment({ postId }: PostCommentProps) {
  const {
    data: commentData,
    ref,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useInfiniteScroll<CommentListType>({
    queryKey: ['commentList', postId],
    fetchFunction: (page: number) =>
      fetchData({
        param: `/post/${postId}/comment/list?order=DESC&page=${page}&take=10`,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
  });

  const {
    deleteCommentRequest,
    postLikeRequest,
    deleteLikeRequest,
    editCommentRequest,
  } = useCommentRequest(postId, false, refetch);

  if (isPending) <>Loading...</>;

  return (
    <div className={cn('wrapper')}>
      <CommentInput
        placeholder="댓글을 입력하세요"
        postId={postId}
        refetch={refetch}
        isFeed={false}
      />
      <div className={cn('comment-container')}>
        {commentData?.pages.map(({ data: commentList }, index) =>
          commentList.length ? (
            commentList.map((comment) => (
              <div key={comment.comment.id} className={cn('comment-list')}>
                <CommentCard
                  comment={comment}
                  deleteLikeRequest={deleteLikeRequest}
                  postLikeRequest={postLikeRequest}
                  deleteCommentRequest={deleteCommentRequest}
                  editCommentRequest={editCommentRequest}
                  commentRefetch={refetch}
                />
              </div>
            ))
          ) : (
            <div key={index} className={cn('no-comment')}>
              댓글이 없습니다.
            </div>
          ),
        )}
      </div>
      {!isFetchingNextPage && <div ref={ref} />}
    </div>
  );
}
