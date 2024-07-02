import fetchData from '@/api/fetchData';
import CommentInput from '@/components/Common/CommentInput';
import { ReplyListType } from '@/components/Feed/types';
import { useReplyRequest } from '@/hooks/useReplyRequest';
import { useInfiniteQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ReplyIcon } from '../IconCollection';
import ReplyCard from '../ReplyCard';
import styles from './ReplyContainer.module.scss';

const cn = classNames.bind(styles);

interface ReplyContainerProps {
  isPost: boolean;
  isVisible: boolean;
  id: number;
  commentId: number;
}

export default function ReplyContainer({
  isPost,
  isVisible,
  id,
  commentId,
}: ReplyContainerProps) {
  const {
    data: replyData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ReplyListType>({
    queryKey: [isPost ? 'postCommentReply' : 'feedCommentReply', commentId],
    queryFn: ({ pageParam }) =>
      fetchData({
        param: `/${isPost ? 'post' : 'feed'}/comment/${commentId}/reply/list?order=DESC&page=${pageParam}&take=5`,
      }),
    initialPageParam: 1,
    getNextPageParam: (data) => {
      if (data.meta.hasNextPage) {
        return data.meta.page + 1;
      }
      return undefined;
    },
  });

  const { writeReplyMutate } = useReplyRequest(isPost, id, commentId);

  return (
    isVisible && (
      <div className={cn('wrapper')}>
        <ReplyIcon width="14" />
        <div className={cn('container')}>
          <div className={cn('reply-container')}>
            {replyData?.pages.map((page) =>
              page.data.map((item) => (
                <ReplyCard
                  key={item.reply.id}
                  id={id}
                  commentId={commentId}
                  replyData={item}
                  isPost={isPost}
                />
              )),
            )}
          </div>
          {hasNextPage && (
            <button
              className={cn('loadmore-button')}
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              더 보기
            </button>
          )}
          <CommentInput mutateFn={writeReplyMutate} />
        </div>
      </div>
    )
  );
}
