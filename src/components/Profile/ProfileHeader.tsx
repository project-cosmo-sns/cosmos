import styles from './ProfileHeader.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';

const cn = classNames.bind(styles);

export default function ProfileHeader() {
  return (
    <div className={cn('header-container')}>
      <div>
        <Image
          src="/icon/profile.svg"
          width={86}
          height={86}
          alt="프로필 아이콘"
        />
      </div>
      <div className={cn('profile-information')}>
        <div className={cn('profile-name-section')}>
          <div>이름</div>
          <div className={cn('gen-badge')}>뱃지</div>
        </div>
        <div className={cn('profile-following-section')}>
          <div>팔로워 팔로워 수</div>
          <div>팔로잉 팔로잉 수</div>
        </div>
        <div>소개</div>
      </div>
      <div>
        {' '}
        <Image
          src="/icon/setting.svg"
          width={18}
          height={18}
          alt="설정 아이콘"
        />
      </div>
    </div>
  );
}
