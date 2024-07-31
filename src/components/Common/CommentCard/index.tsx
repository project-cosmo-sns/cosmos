import { EditCommentType } from '@/@types/type';
import { CommentDetailType } from '@/components/Feed/types';
import getElapsedTime from '@/utils/getElaspedTime';
import classNames from 'classnames/bind';
import { useState, Dispatch, SetStateAction } from 'react';
import ActionButtons from '../Buttons/ActionButtons';
import DeleteModal from '../DeleteModal';
import { LikeIcon, LikedIcon } from '../IconCollection';
import ReplyContainer from '../ReplyContainer';
import TextWithLinks from '../TextWithLinks';
import WriterProfile from '../WriterProfile';
import styles from './CommentCard.module.scss';
import EditComment from './EditComment';

const cn = classNames.bind(styles);

type CommentRequestType = (commentId: number) => void;

type EditCommentRequestType = ({
  commentId,
  data,
}: {
  commentId: number;
  data: EditCommentType;
}) => void;

interface CommentCardProps {
  isPost?: boolean;
  id: number;
  comment: CommentDetailType;
  deleteLikeRequest: CommentRequestType;
  postLikeRequest: CommentRequestType;
  deleteCommentRequest: CommentRequestType;
  editCommentRequest: EditCommentRequestType;
  setIsNotificationFeedModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function CommentCard({
  isPost = false,
  id,
  comment,
  deleteLikeRequest,
  postLikeRequest,
  deleteCommentRequest,
  editCommentRequest,
  setIsNotificationFeedModalOpen,
}: CommentCardProps) {
  const commentData = comment.comment;

  const {
    id: commentId,
    content,
    heartCount,
    isHearted,
    createdAt,
    isMine,
    isReplied,
  } = commentData;

  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReplyVisible, setIsReplyVisible] = useState(false);

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
        <WriterProfile
          setIsNotificationFeedModalOpen={setIsNotificationFeedModalOpen}
          writer={comment.writer}
          createdAt={formattedCreatedAt}
        />
        <div className={cn('container')}>
          <button
            type="button"
            onClick={() => setIsReplyVisible((prev) => !prev)}
            className={cn('reply-button')}
          >
            답글 달기
          </button>
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
      <ReplyContainer
        isPost={isPost}
        isVisible={isReplyVisible}
        id={id}
        commentId={commentId}
      />
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
