import fetchData from '@/api/fetchData';
import { ReplyListType } from '@/components/Feed/types';
import getElapsedTime from '@/utils/getElaspedTime';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ChangeEvent, useState } from 'react';
import DefaultButton from '../Buttons/DefaultButton';
import { LikeIcon, ReplyIcon } from '../IconCollection';
import Input from '../Input';
import WriterProfile from '../WriterProfile';
import styles from './ReplyContainer.module.scss';

const cn = classNames.bind(styles);

interface ReplyContainerProps {
  isVisible: boolean;
  commentId: number;
}

export default function ReplyContainer({
  isVisible,
  commentId,
}: ReplyContainerProps) {
  const [replyValue, setReplyValue] = useState('');
  const { data: replyData, isPending } = useQuery<ReplyListType>({
    queryKey: ['postCommentReply', commentId],
    queryFn: () =>
      fetchData({
        param: `/post/comment/${commentId}/reply/list`,
      }),
  });

  console.log(commentId);
  console.log(replyData);

  return (
    isVisible && (
      <div className={cn('wrapper')}>
        <ReplyIcon width="14" />
        <div className={cn('container')}>
          <div className={cn('reply-container')}>
            {replyData?.data.map((item) => (
              <div className={cn('reply-card')} key={item.reply.id}>
                <div className={cn('reply-writer')}>
                  <WriterProfile
                    writer={item.writer}
                    createdAt={getElapsedTime(item.reply.createdAt)}
                  />
                  <div className={cn('like-container')}>
                    <LikeIcon width="18" />
                    <span className={cn('like-count')}>
                      {item.reply.heartCount}
                    </span>
                  </div>
                </div>
                <span>{item.reply.content}</span>
              </div>
            ))}
          </div>
          <div className={cn('reply-input')}>
            <Input
              placeholder="댓글을 입력하세요"
              type="input"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setReplyValue(event.target.value)
              }
            />
            <DefaultButton
              buttonType="button"
              size="small"
              color="black-01"
              onClick={() => console.log(replyValue)}
            >
              등록
            </DefaultButton>
          </div>
        </div>
      </div>
    )
  );
}
