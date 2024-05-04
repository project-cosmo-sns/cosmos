import Image from 'next/image';
import styles from './Follow.module.scss';
import classNames from 'classnames/bind';
import GenerationBadge from '@/components/Common/GenerationBadge';
import FollowButton from '@/components/Common/Buttons/FollowButton';

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
  
  const followClick = () => {
    console.log('팔로우!');
  };

  return (
    <div key={memberId} className={cn('follow-wrapper')}>
      <div className={cn('follow-info')}>
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt="profile" width={40} height={40} />
        ) : (
          <div>없음</div>
        )}
        <span>{nickname}</span>
        <GenerationBadge generationInfo={generation} />
      </div>
      <FollowButton onClick={followClick} isFollow={isFollow} />
    </div>
  );
}
