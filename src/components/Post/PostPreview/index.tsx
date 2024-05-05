import AuthorProfile from '@/components/Common/AuthorProfile';
import ReactionContainer from '@/components/Common/ReactionContainer';
import { MARKDOWN_SYMBOL_REGEX } from '@/constants/regexPattern';
import { PostData } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import HashTag from '../HashTag';
import styles from './PostPreview.module.scss';
import getElapsedTime from '@/utils/getElaspedTime';

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
    title,
    content,
    emoji,
    comments,
    tags,
    views,
  } = postData;

  const formattedCreatedAt = getElapsedTime(createdAt);

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
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>{title}</div>
        <div className={cn('content')}>
          {content.replace(MARKDOWN_SYMBOL_REGEX, '').trim()}
        </div>
      </div>
      <div className={cn('hashtag-container')}>
        {tags.map((tag) => (
          <HashTag key={tag.name} tag={tag} />
        ))}
      </div>
      <ReactionContainer
        emoji={emoji}
        commentsCount={comments.length}
        views={views}
      />
    </div>
  );
}
