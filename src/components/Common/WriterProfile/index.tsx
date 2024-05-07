import { Writer } from '@/components/Feed/types';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './WriterProfile.module.scss';
import TermBadge from '../Badge/TermBadge';
import { useRouter } from 'next/router';

interface WriterProfileProps {
  writer: Writer;
  createdAt: string;
}

const cn = classNames.bind(styles);

export default function WriterProfile({
  writer,
  createdAt,
}: WriterProfileProps) {
  const router = useRouter();
  const { id: memberId, nickname, profileImageUrl, generation } = writer;

  return (
    <div className={cn('wrapper')}>
      <Image
        className={cn('profile-image')}
        src={profileImageUrl || '/images/profile.svg'}
        alt="profile_image"
        width={40}
        height={40}
        onClick={(event) => {
          event.stopPropagation();
          router.push(`/profile?memberId=${memberId}`);
        }}
      />
      <div className={cn('info')}>
        <button
          type="button"
          className={cn('nickname')}
          onClick={(event) => {
            event.stopPropagation();
            router.push(`/profile?memberId=${memberId}`);
          }}
        >
          {nickname}
        </button>
        <TermBadge term={generation} />
      </div>
      <span className={cn('created-at')}>{createdAt}</span>
    </div>
  );
}
