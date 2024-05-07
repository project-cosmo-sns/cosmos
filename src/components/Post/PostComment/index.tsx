import CommentCard from '@/components/Common/CommentCard';
import CommentInput from '@/components/Common/CommentInput';
import { CommentListType } from '@/components/Feed/types';
import classNames from 'classnames/bind';
import styles from './PostComment.module.scss';
import { useRouter } from 'next/router';
import { useCommentRequest } from '@/hooks/useCommentRequest';
import { useQuery } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';

interface PostCommentProps {
  postId: number;
}

const cn = classNames.bind(styles);

export default function PostComment({ postId }: PostCommentProps) {
  const router = useRouter();

  const {
    onSubmit,
    deleteCommentRequest,
    postLikeRequest,
    deleteLikeRequest,
    editCommentRequest,
  } = useCommentRequest(postId, false);

  const { data: commentData } = useQuery<CommentListType>({
    queryKey: ['commentList', postId],
    queryFn: () => fetchData({ param: `/post/${postId}/comment/list` }),
  });

  return (
    <div className={cn('wrapper')}>
      <CommentInput placeholder="댓글을 입력하세요" onSubmit={onSubmit} />
      <div className={cn('comment-container')}>
        {commentData ? (
          commentData.data.map((comment, index) => (
            <div key={comment.comment.id}>
              <CommentCard
                comment={comment}
                deleteLikeRequest={deleteLikeRequest}
                postLikeRequest={postLikeRequest}
                deleteCommentRequest={deleteCommentRequest}
                editCommentRequest={editCommentRequest}
              />
              {index === commentData.data.length - 1 || (
                <div className={cn('divide-line')} />
              )}
            </div>
          ))
        ) : (
          <>없어</>
        )}
      </div>
    </div>
  );
}
