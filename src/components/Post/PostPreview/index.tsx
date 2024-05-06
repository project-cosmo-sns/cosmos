import AuthorProfile from '@/components/Common/AuthorProfile';
import ReactionContainer from '@/components/Common/ReactionContainer';
import { MARKDOWN_SYMBOL_REGEX } from '@/constants/regexPattern';
import getElapsedTime from '@/utils/getElaspedTime';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import HashTag from '../HashTag';
import { PostListDataType } from '../types';
import styles from './PostPreview.module.scss';
import EmojiBundle from '@/components/Common/EmojiBundle';

interface PostPreviewProps {
  postData: PostListDataType;
}

export default function PostPreview({ postData }: PostPreviewProps) {
  const cn = classNames.bind(styles);
  const router = useRouter();
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);

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
    setIsEmojiVisible(true);
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
        emojiCount={emojiCount}
        commentCount={commentCount}
        viewCount={viewCount}
      />
      {/* 현재 포스트 목록에서 이모지 리스트 안내려와서 emojiList 못 전달 중이라 주석처리함 */}
      {/* <EmojiBundle emojiList={emoji} isDetail={false} isVisible={isEmojiVisible}/> */}
    </div>
  );
}
