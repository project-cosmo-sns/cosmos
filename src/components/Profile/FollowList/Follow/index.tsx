import Image from 'next/image';
import styles from './Follow.module.scss';
import classNames from 'classnames/bind';
import { FollowType } from '../FollowMockData';
import GenerationBadge from '@/components/Common/GenerationBadge';
import FollowButton from '@/components/Common/Buttons/FollowButton';

const cn = classNames.bind(styles);

export default function Follow({
  image,
  name,
  generation,
  id,
  isFollow,
}: FollowType) {
  const followClick = () => {
    console.log('팔로우!');
  };

  return (
    <div key={id} className={cn('follow-wrapper')}>
      <div className={cn('follow-info')}>
        <Image src={image} alt="profile" width={40} height={40} />
        <span>{name}</span>
        <GenerationBadge generationInfo={generation} />
      </div>
      <FollowButton onClick={followClick} isFollow={isFollow} />
    </div>
  );
}
