import Image from 'next/image';
import styles from './Follow.module.scss';
import classNames from 'classnames/bind';
import GenerationBadge from '@/components/Common/GenerationBadge';
import FollowButton from '@/components/Common/Buttons/FollowButton';
import useFollowClick from '@/hooks/useFollowClick';

const cn = classNames.bind(styles);

export interface FollowType {
  memberId: number;
  profileImageUrl?: string;
  nickname: string;
  generation: number;
  isFollowButton?: boolean;
}

export default function Follow({
  profileImageUrl,
  nickname,
  generation,
  memberId,
  isFollowButton,
}: FollowType) {
  const { isActive, toggleFollow } = useFollowClick(memberId);

  return (
    <div key={memberId} className={cn('follow-wrapper')}>
      <div className={cn('follow-info')}>
        <Image
          src={profileImageUrl || '/images/profile.svg'}
          alt="profile_image"
          width={40}
          height={40}
        />
        <span>{nickname}</span>
        <GenerationBadge
          generationInfo={generation}
          isAuthorized={!!generation}
        />
      </div>
      <FollowButton
        onClick={toggleFollow}
        isFollowButton={isFollowButton}
        isActive={isActive}
      />
    </div>
  );
}
