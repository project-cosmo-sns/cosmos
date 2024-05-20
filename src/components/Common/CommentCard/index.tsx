import { EditCommentType } from '@/@types/type';
import { CommentDetailType } from '@/components/Feed/types';
import getElapsedTime from '@/utils/getElaspedTime';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ActionButtons from '../Buttons/ActionButtons';
import DeleteModal from '../DeleteModal';
import { LikeIcon, LikedIcon } from '../IconCollection';
import WriterProfile from '../WriterProfile';
import styles from './CommentCard.module.scss';
import EditComment from './EditComment';
import TextWithLinks from '../TextWithLinks';

const cn = classNames.bind(styles);

type CommentRequestType = (commentId: number) => void;

type EditCommentRequestType = ({
  commentId,
  data,
}: {
  commentId: number;
  data: EditCommentType;
}) => void;

export default function CommentCard({
  comment,
  deleteLikeRequest,
  postLikeRequest,
  deleteCommentRequest,
  editCommentRequest,
}: {
  comment: CommentDetailType;
  deleteLikeRequest: CommentRequestType;
  postLikeRequest: CommentRequestType;
  deleteCommentRequest: CommentRequestType;
  editCommentRequest: EditCommentRequestType;
}) {
  const commentData = comment.comment;

  const {
    id: commentId,
    content,
    heartCount,
    isHearted,
    createdAt,
    isMine,
  } = commentData;

  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isLiked, setIsLiked] = useState(isHearted);
  const [reactionCount, setReactionCount] = useState(heartCount);

  const formattedCreatedAt = getElapsedTime(createdAt);

  const handleClickEditComment = () => {
    setIsCommentEditing((prev) => !prev);
  };

  const handleClickDeleteComment = () => {
    setIsDeleteModalOpen(true);
  };

  const handleClickLikeComment = () => {
    setIsLiked((prev) => !prev);
    setReactionCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const onSubmit = (data: EditCommentType) => {
    editCommentRequest({ commentId, data });
    setIsCommentEditing(false);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <WriterProfile writer={comment.writer} createdAt={formattedCreatedAt} />
        <div className={cn('container')}>
          <div className={cn('like')} onClick={handleClickLikeComment}>
            {isLiked ? (
              <LikedIcon
                onClick={() => deleteLikeRequest(commentId)}
                width="18"
                height="18"
              />
            ) : (
              <LikeIcon
                onClick={() => postLikeRequest(commentId)}
                width="18"
                height="18"
              />
            )}
            {reactionCount}
          </div>
          <ActionButtons
            isButtonShow={isMine}
            handleClickEdit={handleClickEditComment}
            handleClickDelete={handleClickDeleteComment}
          />
        </div>
      </div>
      <div className={cn('content')}>
        {isCommentEditing ? (
          <EditComment onSubmit={onSubmit} content={content} />
        ) : (
          <TextWithLinks text={content} />
        )}
      </div>
      <DeleteModal
        title="삭제"
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={() => {
          deleteCommentRequest(commentId);
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
}
