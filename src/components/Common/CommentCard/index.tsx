import AuthorProfile from '@/components/Common/AuthorProfile';
import { Comment } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ActionButtons from '../Buttons/ActionButtons';
import { LikeIcon, LikedIcon } from '../IconCollection';
import Modal from '../Layout/Modal';
import styles from './CommentCard.module.scss';

interface CommentCardProps {
  comment: Comment;
}

const cn = classNames.bind(styles);

export default function CommentCard({ comment }: CommentCardProps) {
  const { author, createdAt, content, reactionCount, likedByCurrentUser } =
    comment;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [commentValue, setCommentValue] = useState(content);

  // 댓글 좋아요 버튼 및 숫자 임시로 테스트하기 위해 상태 추가. 추후 삭제 에정
  const [tmpLikedByCurrentUser, setlTmpLikedByCurrentUser] =
    useState(likedByCurrentUser);
  const [tmpReactionCount, setTmpReactionCount] = useState(reactionCount);

  // author.id === userId 일 때 true
  const isMyComment = true;

  // 날짜 형식 정해지면 삭제 or 변경 예정
  const formattedCreatedAt = createdAt.slice(0, 10);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <AuthorProfile author={author} createdAt={formattedCreatedAt} />
        <div className={cn('container')}>
          {/* 임시 tmpLikedByCurrentUser 상태 */}
          <div
            className={cn('like')}
            onClick={() => {
              setlTmpLikedByCurrentUser((prev) => !prev);
              setTmpReactionCount((prev) =>
                tmpLikedByCurrentUser ? prev - 1 : prev + 1,
              );
            }}
          >
            {tmpLikedByCurrentUser ? (
              <LikedIcon width="18" height="18" />
            ) : (
              <LikeIcon width="18" height="18" />
            )}
            {/* 임시 tmpReactionCount 상태 */}
            {tmpReactionCount}
          </div>
          <ActionButtons
            isButtonShow={isMyComment}
            handleClickEdit={() => {
              setIsCommentEditing((prev) => !prev);
              setCommentValue(content);
            }}
            handleClickDelete={() => {
              setIsDeleteModalOpen(true);
            }}
          />
          {isDeleteModalOpen && (
            <Modal
              title="삭제 모달"
              modalVisible={isDeleteModalOpen}
              toggleModal={setIsDeleteModalOpen}
            >
              <div>하이</div>
            </Modal>
          )}
        </div>
      </div>
      <div className={cn('content')}>
        {isCommentEditing ? (
          // 댓글 수정창 디자인 없어서 임시로 만들어둠. 추후 수정예정
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '4px',
            }}
          >
            <textarea
              value={commentValue}
              onChange={(event) => setCommentValue(event.target.value)}
            />
            <button
              type="button"
              style={{
                padding: '4px 20px  ',
                borderRadius: '5px',
                backgroundColor: '#304030',
              }}
            >
              수정
            </button>
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
