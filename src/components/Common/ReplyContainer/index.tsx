import { ReplyListType } from '@/components/Feed/types';
import classNames from 'classnames/bind';
import styles from './ReplyContainer.module.scss';
import fetchData from '@/api/fetchData';
import { useQuery } from '@tanstack/react-query';

const cn = classNames.bind(styles);

interface ReplyContainerProps {
  isVisible: boolean;
  commentId: number;
}

export default function ReplyContainer({
  isVisible,
  commentId,
}: ReplyContainerProps) {
  const { data: replyData, isPending } = useQuery<ReplyListType>({
    queryKey: ['postCommentReply', commentId],
    queryFn: () =>
      fetchData({
        param: `/post/comment/151/reply/list`,
      }),
  });

  console.log(replyData);

  return (
    isVisible && (
      <div className={cn('wrapper')}>
        <div className={cn('divide-line')} />
        <div>{commentId}</div>
      </div>
    )
  );
}
