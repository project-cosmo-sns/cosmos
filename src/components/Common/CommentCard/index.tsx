import AuthorProfile from '@/components/Common/AuthorProfile';
import { Comment } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ActionButtons from '../Buttons/ActionButtons';
import { LikeIcon, LikedIcon } from '../IconCollection';
import Modal from '../Layout/Modal';
import styles from './CommentCard.module.scss';
import EditComment from './EditComment';
import { CommentDetailType } from '@/components/Feed/types';

const cn = classNames.bind(styles);

export default function CommentCard({
  comment,
}: {
  comment: CommentDetailType;
}) {
  const commentData = comment.comment;
  const writerData = comment.writer;

  const { content, createdAt, heartCount: likeCount, isHearted } = commentData;
  const { generation, nickname, profileImageUrl } = writerData;

  const [commentValue, setCommentValue] = useState(content);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 댓글 좋아요 버튼 및 숫자 임시로 테스트하기 위해 상태 추가. 추후 삭제 에정
  const [isLiked, setIsLiked] = useState(isHearted);
  const [reactionCount, setReactionCount] = useState(likeCount);

  // author.id === userId 일 때 true
  const isMyComment = true;

  // 날짜 형식 정해지면 삭제 or 변경 예정
  const formattedCreatedAt = createdAt.slice(0, 10);

  const handleClickEditComment = () => {
    setIsCommentEditing((prev) => !prev);
    setCommentValue(content);
  };

  const handleClickDeleteComment = () => {
    setIsDeleteModalOpen(true);
  };

  // 임시 댓글 좋아요 클릭 함수. 추후 댓글 좋아요 요청보내고 받아온 값으로 바꾸도록 수정 예정
  const handleClickLikeComment = () => {
    setIsLiked((prev) => !prev);
    setReactionCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <AuthorProfile author={comment.writer} createdAt={formattedCreatedAt} />
        <div className={cn('container')}>
          <div className={cn('like')} onClick={handleClickLikeComment}>
            {isLiked ? (
              <LikedIcon width="18" height="18" />
            ) : (
              <LikeIcon width="18" height="18" />
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
              <div>하이</div>
            </Modal>
          )}
        </div>
      </div>
      <div className={cn('content')}>
        {isCommentEditing ? (
          <EditComment
            commentValue={commentValue}
            setCommentValue={setCommentValue}
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}
