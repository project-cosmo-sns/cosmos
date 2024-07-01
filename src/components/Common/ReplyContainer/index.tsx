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
  isVisible: boolean;
  id: number;
  commentId: number;
}

export default function ReplyContainer({
  isVisible,
  id,
  commentId,
}: ReplyContainerProps) {
  const queryClient = useQueryClient();

  const { data: replyData } = useQuery<ReplyListType>({
    queryKey: ['postCommentReply', commentId],
    queryFn: () =>
      fetchData({
        param: `/post/comment/${commentId}/reply/list`,
      }),
  });

  const { mutate } = useMutation({
    mutationFn: (replyValue: string) =>
      fetchData({
        param: `/post/${id}/comment/${commentId}/write`,
        method: 'post',
        requestData: {
          content: replyValue,
        },
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['postCommentReply', commentId],
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
              <ReplyCard key={item.reply.id} replyData={item} />
            ))}
          </div>
          <CommentInput mutateFn={mutate} />
        </div>
      </div>
    )
  );
}
