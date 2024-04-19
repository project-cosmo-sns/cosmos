import AuthorProfile from '@/components/Common/AuthorProfile';
import { Comment } from '@/pages/post/[id]/mockData';
import classNames from 'classnames/bind';
import styles from './CommentCard.module.scss';
import { DeleteIcon, EditIcon, LikeIcon } from '../IconCollection';

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const cn = classNames.bind(styles);
  const { id, author, createdAt, content, reactionCount } = comment;
  // author.id === userId 일 때 true
  const isMyComment = true;

  // 날짜 형식 정해지면 삭제 or 변경 예정
  const formattedCreatedAt = createdAt.slice(0, 10);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header')}>
        <AuthorProfile author={author} createdAt={formattedCreatedAt} />
        <div className={cn('container')}>
          <div className={cn('like')}>
            <LikeIcon width="18" height="18" />
            {reactionCount}
          </div>
          {isMyComment && (
            <>
              <button
                type="button"
                aria-label="수정"
                onClick={() => console.log('댓글 수정')}
              >
                <EditIcon width="18" height="18" />
              </button>
              <button
                type="button"
                aria-label="삭제"
                onClick={() => console.log('댓글 삭제')}
              >
                <DeleteIcon width="18" height="18" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className={cn('content')}>{content}</div>
    </div>
  );
}
