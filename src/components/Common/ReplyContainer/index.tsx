import fetchData from '@/api/fetchData';
import CommentInput from '@/components/Common/CommentInput';
import { ReplyListType } from '@/components/Feed/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ReplyIcon } from '../IconCollection';
import ReplyCard from '../ReplyCard';
import styles from './ReplyContainer.module.scss';

const cn = classNames.bind(styles);

interface ReplyContainerProps {
  isPost?: boolean;
  isVisible: boolean;
  id: number;
  commentId: number;
}

export default function ReplyContainer({
  isPost = false,
  isVisible,
  id,
  commentId,
}: ReplyContainerProps) {
  const queryClient = useQueryClient();

  const { data: replyData } = useQuery<ReplyListType>({
    queryKey: [isPost ? 'postCommentReply' : 'feedCommentReply', commentId],
    queryFn: () =>
      fetchData({
        param: `/${isPost ? 'post' : 'feed'}/comment/${commentId}/reply/list`,
      }),
  });

  const { mutate: writeReplyMutate } = useMutation({
    mutationFn: (replyValue: string) =>
      fetchData({
        param: `/${isPost ? 'post' : 'feed'}/${id}/comment/${commentId}/write`,
        method: 'post',
        requestData: {
          content: replyValue,
        },
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [isPost ? 'postCommentReply' : 'feedCommentReply', commentId],
      });
    },
  });

  return (
    isVisible && (
      <div className={cn('wrapper')}>
        <ReplyIcon width="14" />
        <div className={cn('container')}>
          <div className={cn('reply-container')}>
            {replyData?.data.map((item) => (
              <ReplyCard key={item.reply.id} id={id} replyData={item} isPost />
            ))}
          </div>
          <CommentInput mutateFn={writeReplyMutate} />
        </div>
      </div>
    )
  );
}
