import AuthorProfile from '@/components/Common/AuthorProfile';
import { Comment } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import styles from './CommentCard.module.scss';
import { DeleteIcon, EditIcon, LikeIcon, LikedIcon } from '../IconCollection';

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const cn = classNames.bind(styles);
  const { author, createdAt, content, reactionCount, likedByCurrentUser } =
    comment;
  // author.id === userId 일 때 true
  const isMyComment = true;

  // 날짜 형식 정해지면 삭제 or 변경 예정
  const formattedCreatedAt = createdAt.slice(0, 10);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <AuthorProfile author={author} createdAt={formattedCreatedAt} />
        <div className={cn('container')}>
          <div
            className={cn('like')}
            onClick={() => console.log('!likedByCurrentUser 요청 보내기')}
          >
            {likedByCurrentUser ? (
              <LikedIcon width="18" height="18" />
            ) : (
              <LikeIcon width="18" height="18" />
            )}
            {reactionCount}
          </div>
          {isMyComment && (
            <div className={cn('edit')}>
              <EditIcon
                width="18"
                height="18"
                onClick={() => console.log('댓글 수정')}
              />

              <DeleteIcon
                width="18"
                height="18"
                onClick={() => console.log('포스트 삭제하시겠습니까 모달 on')}
              />
            </div>
          )}
        </div>
      </div>
      <div className={cn('content')}>{content}</div>
    </div>
  );
}
