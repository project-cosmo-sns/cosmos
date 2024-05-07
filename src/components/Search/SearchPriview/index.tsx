import AuthorProfile from '../AuthorProfile';
import ReactionContainer from '@/components/Common/ReactionContainer';
import { MARKDOWN_SYMBOL_REGEX } from '@/constants/regexPattern';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
// import { MouseEvent } from 'react';
// import HashTag from '@/components/Post/HashTag';
import styles from './SearchPriview.module.scss';
import getElapsedTime from '@/utils/getElaspedTime';
import { SearchData } from '../type';

interface SearchPreviewProps {
  searchData: SearchData;
}

export default function SearchPreview({ searchData }: SearchPreviewProps) {
  const cn = classNames.bind(styles);
  const router = useRouter();

  const {
    writer,
    post: {
      id: postId,
      title,
      content,
      viewCount,
      commentCount,
      emojiCount,
      createdAt,
    },
  } = searchData;

  const formattedCreatedAt = getElapsedTime(createdAt);

  return (
    <div
      className={cn('wrapper')}
      onClick={() => router.push(`/post/${postId}`)}
    >
      <AuthorProfile writer={writer} createdAt={formattedCreatedAt} />
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>{title}</div>
        <div className={cn('content')}>
          {content.replace(MARKDOWN_SYMBOL_REGEX, '').trim()}
        </div>
      </div>
      {/* <div className={cn('hashtag-container')}>
        {tags.map((tag) => (
          <HashTag key={tag.name} tag={tag} />
        ))}
      </div> */}
      <ReactionContainer
        emojiCount={emojiCount}
        commentCount={commentCount}
        viewCount={viewCount}
      />
    </div>
  );
}
