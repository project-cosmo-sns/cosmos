import AuthorProfile from '@/components/Common/AuthorProfile';
import ReactionContainer from '@/components/Common/ReactionContainer';
import { MARKDOWN_SYMBOL_REGEX } from '@/constants/regexPattern';
import useSendEmojiRequest from '@/hooks/useSendEmojiRequest';
import getElapsedTime from '@/utils/getElaspedTime';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
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
    emojis,
    viewCount,
    emojiCount,
    commentCount,
    hashTags,
  } = postData.postListInfo.post;

  const formattedCreatedAt = getElapsedTime(createdAt);

  const { handleEmojiClick, isAddPending, isDeletePending } =
    useSendEmojiRequest(postId as number, true);

  console.log(emojis);
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
        emojis={emojis}
        handleEmojiClick={handleEmojiClick}
      />
    </div>
  );
}
