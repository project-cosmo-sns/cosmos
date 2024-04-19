import AuthorProfile from '@/components/Common/AuthorProfile';
import CommentCard from '@/components/Common/CommentCard';
import {
  BackIcon,
  DeleteIcon,
  EditIcon,
} from '@/components/Common/IconCollection';
import ReactionContainer from '@/components/Common/ReactionContainer';
import HashTag from '@/components/Post/HashTag';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './PostDetail.module.scss';
import { Tag, mockData } from './mockData';

function CommentInput() {
  return (
    <div
      style={{
        display: 'grid',
        gap: '4px',
        width: '100%',
        gridTemplateColumns: '3fr 1fr',
        marginTop: '20px',
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
  );
}

export default function PostDetailPage() {
  const cn = classNames.bind(styles);
  const router = useRouter();
  // 임시로 데이터 하나로 테스트. 추후 query.id 값을 이용해 post 불러와서 사용
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
  } = mockData[0];
  // author.id === userId 일 때 true
  const isMyPost = true;

  // 날짜 형식 정해지면 삭제 or 변경 예정
  const formattedCreatedAt = createdAt.slice(0, 10);

  return (
    <div className={cn('wrapper')}>
      <BackIcon
        width="18"
        height="18"
        className={cn('back')}
        onClick={() => router.back()}
      />
      <span className={cn('category')}>{category}</span>
      <span className={cn('title')}>{title}</span>
      <div className={cn('header')}>
        <AuthorProfile author={author} createdAt={formattedCreatedAt} />
        {isMyPost && (
          <div className={cn('edit')}>
            <EditIcon
              width="18"
              height="18"
              onClick={() => console.log('포스트 수정페이지로 이동')}
            />
            <DeleteIcon
              width="18"
              height="18"
              onClick={() => console.log('포스트 삭제하시겠습니까 모달 on')}
            />
          </div>
        )}
      </div>
      <div className={cn('divide-line')} />
      <div className={cn('content')}>{content}</div>
      <div className={cn('hashtag-container')}>
        {tags.map((tag: Tag) => (
          <HashTag key={tag.id} tag={tag} />
        ))}
      </div>
      <ReactionContainer
        emoji={emoji}
        commentsCount={comments.length}
        views={views}
        handleEmojiClick={() =>
          console.log('이모지 모달 열기 or 좋아요만 하려면 이모지 토글')
        }
      />
      {/* 아래 CommentInput 추후 CommentInput 컴포넌트 완성되면 대체 예정 */}
      <CommentInput />
      <div className={cn('comment-container')}>
        {comments.map((comment, index) => (
          <div key={comment.id}>
            <CommentCard comment={comment} />
            {index === comments.length - 1 || (
              <div className={cn('divide-line')} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
