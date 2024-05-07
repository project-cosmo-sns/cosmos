import { useState } from 'react';
import { Writer } from '@/components/Feed/types';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './AuthorProfile.module.scss';
import TermBadge from '../Badge/TermBadge';

interface AuthorProfileProps {
  author: Writer;
  createdAt: string;
}

const cn = classNames.bind(styles);

export default function AuthorProfile({
  author,
  createdAt,
}: AuthorProfileProps) {
  const { nickname, profileImageUrl, generation } = author;
  const [isImageError, setIsImageError] = useState(false);
  const profileImage = profileImageUrl || 'images/profile.svg';
  return (
    <div className={cn('wrapper')}>
      <Image
        className={cn('profile-image')}
        src={isImageError ? 'images/profile.svg' : profileImage}
        alt="profile_image"
        width={40}
        height={40}
        onClick={() => console.log('프로필모달 열기')}
        onError={() => setIsImageError(true)}
      />
      <div className={cn('info')}>
        <button
          type="button"
          className={cn('nickname')}
          onClick={() => console.log('프로필모달 열기')}
        >
          {nickname}
        </button>
        <TermBadge term={generation} />
      </div>
      <span className={cn('created-at')}>{createdAt}</span>
    </div>
  );
}
