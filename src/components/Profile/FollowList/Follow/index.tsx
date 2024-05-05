import Image from 'next/image';
import styles from './Follow.module.scss';
import classNames from 'classnames/bind';
import GenerationBadge from '@/components/Common/GenerationBadge';
import FollowButton from '@/components/Common/Buttons/FollowButton';
import { useAddFollowData, useDleteFollowData } from '@/api/Follow';

const cn = classNames.bind(styles);

export interface FollowType {
  memberId: number;
  profileImageUrl?: string;
  nickname: string;
  generation: number;
  isFollow?: boolean;
}

export default function Follow({
  profileImageUrl,
  nickname,
  generation,
  memberId,
  isFollow,
}: FollowType) {
  const { mutate: addFollow } = useAddFollowData();
  const { mutate: delteFollow } = useDleteFollowData();

  const followClick = (isActive: boolean) => {
    if (isActive) {
      delteFollow(memberId);
      return;
    }
    addFollow(memberId);
  };

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
        <GenerationBadge generationInfo={generation} />
      </div>
      <FollowButton onClick={followClick} isFollow={isFollow} />
    </div>
  );
}
