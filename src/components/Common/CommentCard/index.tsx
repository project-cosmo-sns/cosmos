import AuthorProfile from '@/components/Common/AuthorProfile';
import { CommentDetailType } from '@/components/Feed/types';
import getElapsedTime from '@/utils/getElaspedTime';
import { EditCommentType } from '@/@types/type';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ActionButtons from '../Buttons/ActionButtons';
import { LikeIcon, LikedIcon } from '../IconCollection';
import Modal from '../Layout/Modal';
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
  } = commentData;

  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 댓글 좋아요 버튼 및 숫자 임시로 테스트하기 위해 상태 추가. 추후 삭제 에정
  const [isLiked, setIsLiked] = useState(isHearted);
  const [reactionCount, setReactionCount] = useState(heartCount);

  // author.id === userId 일 때 true
  const isMyComment = true;

  const formattedCreatedAt = getElapsedTime(createdAt);

  const handleClickEditComment = () => {
    setIsCommentEditing((prev) => !prev);
  };

  const handleClickDeleteComment = () => {
    setIsDeleteModalOpen(true);
  };

  // 임시 댓글 좋아요 클릭 함수. 추후 댓글 좋아요 요청보내고 받아온 값으로 바꾸도록 수정 예정
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
        <AuthorProfile author={comment.writer} createdAt={formattedCreatedAt} />
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
            isButtonShow={isMyComment}
            handleClickEdit={handleClickEditComment}
            handleClickDelete={handleClickDeleteComment}
          />
          {isDeleteModalOpen && (
            <Modal
              title="삭제 모달"
              modalVisible={isDeleteModalOpen}
              toggleModal={setIsDeleteModalOpen}
              cssComponentDisplay={cn('')}
              cssModalSize={cn('')}
            >
              <p>정말 삭제하시겠습니까?</p>
              <button
                type="button"
                onClick={() => {
                  deleteCommentRequest(commentId);
                }}
              >
                삭제
              </button>
            </Modal>
          )}
        </div>
      </div>
      <div className={cn('content')}>
        {isCommentEditing ? (
          <EditComment onSubmit={onSubmit} content={content} />
        ) : (
          content
        )}
      </div>
    </div>
  );
}
