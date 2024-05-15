import EmojiBundle from '@/components/Common/EmojiBundle';
import WriterProfile from '@/components/Common/WriterProfile';
import { MARKDOWN_SYMBOL_REGEX } from '@/constants/regexPattern';
import useSendEmojiRequest from '@/hooks/useSendEmojiRequest';
import getElapsedTime from '@/utils/getElaspedTime';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import HashTag from '../HashTag';
import { PostInfoType } from '../types';
import styles from './PostPreview.module.scss';
import { useFetchMemberStatus } from '@/hooks/useFetchMemberStatus';

interface PostPreviewProps {
  postData: PostInfoType;
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
    commentCount,
    hashTags,
  } = postData.post;

  const formattedCreatedAt = getElapsedTime(createdAt);

  const { handleEmojiClick } = useSendEmojiRequest({
    id: postId as number,
    isPost: true,
  });

  const { checkMemberStatus } = useFetchMemberStatus();

  return (
    <div
      className={cn('wrapper')}
      onClick={() => checkMemberStatus(() => router.push(`/post/${postId}`))}
    >
      <WriterProfile writer={postData.writer} createdAt={formattedCreatedAt} />
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
      <EmojiBundle
        isPost
        emojiList={emojis}
        handleEmojiClick={handleEmojiClick}
        commentCount={commentCount}
        viewCount={viewCount}
      />
    </div>
  );
}
