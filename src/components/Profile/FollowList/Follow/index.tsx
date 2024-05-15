import Image from 'next/image';
import styles from './Follow.module.scss';
import classNames from 'classnames/bind';
import GenerationBadge from '@/components/Common/GenerationBadge';
import FollowButton from '@/components/Common/Buttons/FollowButton';
import useFollowClick from '@/hooks/useFollowClick';
import { deleteFollow } from '@/api/Follow';
import Link from 'next/link';
import { useState } from 'react';

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
  const [deletedFollowerIds, setDeletedFollowerIds] = useState<number[]>([]);

  const { isActive, toggleFollow } = useFollowClick(memberId);

  const deleteClick = async () => {
    try {
      const res = await deleteFollow(memberId);
      setDeletedFollowerIds([...deletedFollowerIds, memberId]);
    } catch (error) {
      console.error('Failed to delete follower:', error);
    }
  };
  if (deletedFollowerIds.includes(memberId)) {
    return null;
  }

  return (
    <div key={memberId} className={cn('follow-wrapper')}>
      <div className={cn('follow-info')}>
        <Link href={`/profile?memberId=${memberId}`}>
          <Image
            src={profileImageUrl || '/images/profile.svg'}
            alt="profile_image"
            width={40}
            height={40}
          />
        </Link>
        <span>{nickname}</span>
        <GenerationBadge generationInfo={generation} />
      </div>
      <FollowButton
        onClick={isFollowButton ? toggleFollow : deleteClick}
        isFollowButton={isFollowButton}
        isActive={isActive}
      />
    </div>
  );
}
