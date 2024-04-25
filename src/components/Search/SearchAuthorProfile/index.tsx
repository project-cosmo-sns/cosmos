import { Author } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './SearchAuthorProfile.module.scss';
import TermBadge from '@/components/Common/Badge/TermBadge';

interface SearchAuthorProfileProps {
  author: Author;
}

export default function SearchAuthorProfile({
  author,
}: SearchAuthorProfileProps) {
  const cn = classNames.bind(styles);
  const { nickname, profileImageUrl, generation } = author;
  return (
    <div className={cn('wrapper')}>
      <Image
        className={cn('profile-image')}
        src={profileImageUrl || '/images/profile.svg'}
        alt="profile_image"
        width={86}
        height={86}
        onClick={() => console.log('프로필 페이지로 이동')}
      />
      <button
        type="button"
        className={cn('nickname')}
        onClick={() => console.log('프로필 페이지로 이동')}
      >
        {nickname}
      </button>
      <TermBadge term={generation} />
    </div>
  );
}
