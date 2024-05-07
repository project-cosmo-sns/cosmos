import { Member } from '../type';
import classNames from 'classnames/bind';
import styles from './SearchAuthorProfile.module.scss';
import Image from 'next/image';
import GenerationBadge from '@/components/Common/GenerationBadge';

interface SearchAuthorProfileProps {
  member: Member;
}

const cn = classNames.bind(styles);

export default function SearchAuthorProfile({
  member,
}: SearchAuthorProfileProps) {
  const {
    nickname,
    generation,
    profileImageUrl,
    introduce,
    followerCount,
    followingCount,
    isFollowing,
    isMine,
  } = member;

  // isFollowing은 팔로우 버튼 변하는거에 따라서... 수정해서 넣어야 할것같습니다! 그래서 일단 false로 통일합니다.

  return (
    <div className={cn('search-profile')}>
      <Image
        className={cn('profile-image')}
        src={profileImageUrl || '/images/profile.svg'}
        alt="profile_image"
        width={86}
        height={86}
        onClick={() => console.log('프로필모달 열기')}
      />
      <div className={cn('profile-infomation')}>
        <div className={cn('profile-name')}>
          <h3>{nickname}</h3>
          <GenerationBadge generationInfo={generation} />
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

      {/* {!isMine && (
        <FollowButton
          onClick={() => console.log('팔로우클릭')}
          isFollow={false}
        />
      )} */}
    </div>
  );
}
