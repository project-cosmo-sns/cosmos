import AuthorProfile from '@/components/Common/AuthorProfile';
import ReactionContainer from '@/components/Common/ReactionContainer';
import { MARKDOWN_SYMBOL_REGEX } from '@/constants/regexPattern';
import getElapsedTime from '@/utils/getElaspedTime';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import HashTag from '../HashTag';
import { PostListDataType } from '../types';
import styles from './PostPreview.module.scss';

interface PostPreviewProps {
  postData: PostListDataType;
}

export default function PostPreview({ postData }: PostPreviewProps) {
  const cn = classNames.bind(styles);
  const router = useRouter();

  const {
    id: postId,
    createdAt,
    title,
    content,
    viewCount,
    emojiCount,
    commentCount,
  } = postData.postListInfo.post;
  const hashTags = postData.postListHashTag;

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
      <AuthorProfile
        author={postData.postListInfo.writer}
        createdAt={formattedCreatedAt}
      />
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>{title}</div>
        <div className={cn('content')}>
          {content.replace(MARKDOWN_SYMBOL_REGEX, '').trim()}
        </div>
      </div>
      <div className={cn('hashtag-container')}>
        {hashTags.map((tag) => (
          <HashTag key={tag.tagName} tag={tag} />
        ))}
      </div>
      <ReactionContainer
        emoji={emojiCount}
        commentsCount={commentCount}
        views={viewCount}
      />
    </div>
  );
}
