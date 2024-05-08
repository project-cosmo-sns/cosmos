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
    onSubmit,
    deleteCommentRequest,
    postLikeRequest,
    deleteLikeRequest,
    editCommentRequest,
  } = useCommentRequest(postId, false);

  const { data: commentData, ref } = useInfiniteScroll<CommentListType>({
    queryKey: ['commentList', postId],
    fetchFunction: (page: number) =>
      fetchData({
        param: `/post/${postId}/comment/list?order=DESC&page=${page}&take=10`,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
  });

  return (
    <div className={cn('wrapper')}>
      <CommentInput placeholder="댓글을 입력하세요" onSubmit={onSubmit} />
      <div className={cn('comment-container')}>
        {commentData ? (
          commentData.pages.map((page) =>
            page.data.map((comment, index) => (
              <div key={comment.comment.id}>
                <CommentCard
                  comment={comment}
                  deleteLikeRequest={deleteLikeRequest}
                  postLikeRequest={postLikeRequest}
                  deleteCommentRequest={deleteCommentRequest}
                  editCommentRequest={editCommentRequest}
                />
                {/* divided line 긋는 방식 변경해야함..  */}
                {index === page.data.length - 1 || (
                  <div className={cn('divide-line')} />
                )}
              </div>
            )),
          )
        ) : (
          <>없어</>
        )}
      </div>
      <div ref={ref} />
    </div>
  );
}
