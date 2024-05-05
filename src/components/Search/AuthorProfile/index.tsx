import { Writer } from '../type';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './AuthorProfile.module.scss';
import TermBadge from '@/components/Common/Badge/TermBadge';

interface AuthorProfileProps {
  writer: Writer;
  createdAt: string;
}

export default function AuthorProfile({
  writer,
  createdAt,
}: AuthorProfileProps) {
  const cn = classNames.bind(styles);
  const { nickname, profileImageUrl, generation } = writer;
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
