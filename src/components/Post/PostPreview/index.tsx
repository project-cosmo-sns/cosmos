import AuthorProfile from '@/components/Common/AuthorProfile';
import ReactionContainer from '@/components/Common/ReactionContainer';
import { PostData } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './PostPreview.module.scss';
import { MouseEvent } from 'react';

interface PostPreviewProps {
  postData: PostData;
}

export default function PostPreview({ postData }: PostPreviewProps) {
  const cn = classNames.bind(styles);
  const router = useRouter();
  const {
    id: postId,
    author,
    createdAt,
    content,
    emoji,
    comments,
    views,
  } = postData;

  // 날짜 형식 정해지면 삭제 or 변경 예정
  const formattedCreatedAt = createdAt.slice(0, 10);

  const handleEmojiClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('좋아요 남기기 or 이모지 팝업 뜨고 이모지 남기기');
  };

  return (
    <div
      className={cn('wrapper')}
      onClick={() => router.push(`/post/${postId}`)}
    >
      <AuthorProfile author={author} createdAt={formattedCreatedAt} />
      <div className={cn('content')}>{content}</div>
      <ReactionContainer
        emoji={emoji}
        commentsCount={comments.length}
        views={views}
        handleEmojiClick={handleEmojiClick}
      />
    </div>
  );
}
