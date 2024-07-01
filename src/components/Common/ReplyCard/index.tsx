import { ReplyDetailType } from '@/components/Feed/types';
import getElapsedTime from '@/utils/getElaspedTime';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ActionButtons from '../Buttons/ActionButtons';
import DeleteModal from '../DeleteModal';
import TextWithLinks from '../TextWithLinks';
import WriterProfile from '../WriterProfile';
import styles from './ReplyCard.module.scss';
import { useMutation } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';
import EditComment from '../CommentCard/EditComment';
import { EditCommentType } from '@/@types/type';

const cn = classNames.bind(styles);

interface ReplyCardProps {
  isPost: boolean;
  id: number;
  replyData: ReplyDetailType;
}

export default function ReplyCard({ isPost, id, replyData }: ReplyCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutate: editReplyMutate } = useMutation({
    mutationFn: (data: string) =>
      fetchData({
        param: `/${isPost ? 'post' : 'feed'}/${id}/reply/${replyData.reply.id}/modify`,
        method: 'patch',
        requestData: {
          content: data,
        },
      }),
    // onSuccess: refetch();
  });

  const { mutate: deleteReplyMutate } = useMutation({
    mutationFn: () =>
      fetchData({
        param: `/${isPost ? 'post' : 'feed'}/${id}/reply/${replyData.reply.id}`,
        method: 'delete',
      }),
  });

  const handleEditReply = (data: EditCommentType) => {
    editReplyMutate(data.editedComment);
    setIsEditing(false);
  };

  const handleDeleteReply = () => {
    deleteReplyMutate();
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={cn('reply-card')}>
      <div className={cn('reply-writer')}>
        <WriterProfile
          writer={replyData.writer}
          createdAt={getElapsedTime(replyData.reply.createdAt)}
        />
        {/* <div className={cn('like-container')}>
      {replyData.reply.isHearted ? (
        <LikedIcon width="18" />
      ) : (
        <LikeIcon width="18" />
      )}
      <span className={cn('like-count')}>
        {replyData.reply.heartCount}
      </span>
    </div> */}
        <ActionButtons
          isButtonShow={replyData.reply.isMine}
          handleClickEdit={() => setIsEditing(true)}
          handleClickDelete={() => setIsDeleteModalOpen(true)}
        />
      </div>
      {isEditing ? (
        <EditComment
          content={replyData.reply.content}
          onSubmit={handleEditReply}
        />
      ) : (
        <TextWithLinks text={replyData.reply.content} />
      )}
      <DeleteModal
        title="삭제"
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDeleteReply}
      />
    </div>
  );
}
