import CommentCard from '@/components/Common/CommentCard';
import {
  BackIcon,
  CommentIcon,
  EmojiIcon,
  EyeIcon,
} from '@/components/Common/IconCollection';
import AuthorProfile from '@/components/Post/AuthorProfile';
import HashTag from '@/components/Post/HashTag';
import classNames from 'classnames/bind';
import styles from './PostDetail.module.scss';
import { Tag, mockData } from './mockData';

export default function PostDetailPage() {
  const cn = classNames.bind(styles);
  const {
    category,
    title,
    author,
    createdAt,
    content,
    tags,
    emoji,
    views,
    comments,
  } = mockData;

  // 날짜 형식 정해지면 삭제 or 변경 예정
  const formattedCreatedAt = createdAt.slice(0, 10);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('back')}>
        <BackIcon width="18" height="18" />
      </div>
      <span className={cn('category')}>{category}</span>
      <span className={cn('title')}>{title}</span>
      <AuthorProfile author={author} createdAt={formattedCreatedAt} />
      <div className={cn('divide-line')} />
      <div className={cn('content')}>{content}</div>
      <div className={cn('hashtag-container')}>
        {tags.map((tag: Tag) => (
          <HashTag key={tag.id} tag={tag} />
        ))}
      </div>
      <div className={cn('reaction-container')}>
        <button type="button" className={cn('reaction', 'emoji')}>
          <EmojiIcon width="18" height="18" />
          {emoji}
        </button>
        <button type="button" className={cn('reaction', 'comment')}>
          <CommentIcon width="18" height="18" />
          {comments.length}
        </button>
        <button type="button" className={cn('reaction', 'view')}>
          <EyeIcon width="18" height="18" />
          {views}
        </button>
      </div>
      {/* 아래 댓글 input은 추후 CommentInput 컴포넌트 완성되면 대체 예정 */}
      <div
        style={{
          display: 'grid',
          gap: '4px',
          width: '100%',
          gridTemplateColumns: '3fr 1fr',
        }}
      >
        <input
          placeholder="댓글을 입력하세요"
          style={{
            gap: '4px',
            background: '#F6F6F6',
            padding: '15px',
            borderRadius: '5px',
          }}
        />
        <button
          type="button"
          onClick={() => console.log('댓글 등록')}
          style={{ color: '#fff', background: '#9747FF', borderRadius: '5px' }}
        >
          등록
        </button>
      </div>
      <div className={cn('comment-container')}>
        {comments.map((comment) => (
          <>
            <CommentCard key={comment.id} comment={comment} />
            <div className={cn('divide-line')} />
          </>
        ))}
      </div>
    </div>
  );
}
