import FollowButton from '@/components/Common/Buttons/FollowButton';
import { Member } from '../type';
import classNames from 'classnames/bind';
import styles from './SearchAuthorProfile.module.scss';
import Image from 'next/image';
import GenerationBadge from '@/components/Common/GenerationBadge';
import { useRouter } from 'next/router';
import useFollowClick from '@/hooks/useFollowClick';

interface SearchAuthorProfileProps {
  member: Member;
}

const cn = classNames.bind(styles);

export default function SearchAuthorProfile({
  member,
}: SearchAuthorProfileProps) {
  const router = useRouter();

  const {
    id,
    nickname,
    generation,
    profileImageUrl,
    introduce,
    followerCount,
    followingCount,
    isFollowing,
    isMine,
  } = member;

  const { toggleFollow } = useFollowClick(id);

  return (
    <div className={cn('search-profile')}>
      <div
        className={cn('profile-content')}
        onClick={() => router.push(`/profile?memberId=${id}`)}
      >
        <Image
          className={cn('profile-image')}
          src={profileImageUrl || '/images/profile.svg'}
          alt="profile_image"
          width={86}
          height={86}
        />
        <div className={cn('profile-infomation')}>
          <div className={cn('profile-name')}>
            <h3>{nickname}</h3>
            <GenerationBadge
              isAuthorized={!!generation}
              generationInfo={generation}
            />
          </div>
          <div className={cn('profile-follow')}>
            <div>
              <span>팔로워</span>
              <strong>{followerCount}</strong>
            </div>
            <div>
              <span>팔로잉</span>
              <strong>{followingCount}</strong>
            </div>
          </div>
          <div className={cn('profile-description')}>
            <p>{introduce || '소개가 없습니다.'}</p>
          </div>
        </div>
      </div>

      <div className={cn('profile-description-mobile')}>
        <p>{introduce || '소개가 없습니다.'}</p>
      </div>

      {!isMine && (
        <FollowButton
          onClick={toggleFollow}
          isFollowButton
          isActive={!isFollowing}
        />
      )}
    </div>
  );
}
