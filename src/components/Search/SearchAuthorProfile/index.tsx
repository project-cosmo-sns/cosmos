import { Author } from '@/pages/post/[postId]/mockData';
import classNames from 'classnames/bind';
import styles from './SearchAuthorProfile.module.scss';
import Image from 'next/image';
import GenerationBadge from '@/components/Common/GenerationBadge';

interface SearchAuthorProfileProps {
  author: Author;
}

const cn = classNames.bind(styles);

export default function SearchAuthorProfile() {
  return (
    <div className={cn('search-profile')}>
      <Image
        className={cn('profile-image')}
        src={
          // profileImageUrl ||
          '/images/profile.svg'
        }
        alt="profile_image"
        width={86}
        height={86}
        onClick={() => console.log('프로필모달 열기')}
      />
      <div className={cn('profile-infomation')}>
        <div className={cn('profile-name')}>
          <h3>코스모스</h3>
          <GenerationBadge />
        </div>
        <div className={cn('profile-follow')}>
          <div>
            <span>팔로워</span>
            <strong>100</strong>
          </div>
          <div>
            <span>팔로잉</span>
            <strong>100</strong>
          </div>
        </div>
        <div className={cn('profile-description')}>
          <p>소개가 없습니다.</p>
        </div>
      </div>
    </div>
  );
}
