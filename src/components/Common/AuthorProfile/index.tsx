import { Author } from '@/pages/post/[id]/mockData';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './AuthorProfile.module.scss';

interface AuthorProfileProps {
  author: Author;
  createdAt: string;
}

export default function AuthorProfile({
  author,
  createdAt,
}: AuthorProfileProps) {
  const cn = classNames.bind(styles);
  const { nickname, profileImageUrl, generation } = author;
  return (
    <div className={cn('wrapper')}>
      <Image
        className={cn('profile-image')}
        src={profileImageUrl || '/images/profile.svg'}
        alt="profile_image"
        width={40}
        height={40}
        onClick={() => console.log('프로필모달 열기')}
      />
      <button
        type="button"
        className={cn('nickname')}
        onClick={() => console.log('프로필모달 열기')}
      >
        {nickname}
      </button>
      <span className={cn('created-at')}>{createdAt}</span>
      <div className={cn('generation-badge')}>{generation}</div>
    </div>
  );
}
