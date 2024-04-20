import styles from './ProfileHeader.module.scss';
import classNames from 'classnames/bind';
import * as Icon from '@/components/Common/IconCollection';
import { MemberDataType } from '@/pages/profile/mockData';
import GenerationBadge from '@/components/Common/GenerationBadge';
import Image from 'next/image';

interface ProfileHeaderProps {
  memberData: MemberDataType[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const cn = classNames.bind(styles);

export default function ProfileHeader({
  memberData,
  setIsModalOpen,
}: ProfileHeaderProps) {
  // currentUserId는 토큰?으로 받아옴?
  const currentUserId = '0'; //임시 ID
  const member =
    memberData && memberData.find((user) => user.id === currentUserId);

  return (
    <div className={cn('header-container')}>
      <div className={cn('profile-image')}>
        {member ? (
          <Image
            src={member.profile_img}
            alt="프로필 이미지"
            width="86"
            height="86"
          />
        ) : (
          <Icon.ProfileIcon width="86" height="86" />
        )}
      </div>
      <div className={cn('profile-middle-section')} />
      <div className={cn('profile-information')}>
        <div className={cn('profile-name-section')}>
          {member ? member.nickname : '게스트'}
          <div className={cn('generation-badge')}>
            <GenerationBadge generationInfo={member?.generation} />
          </div>
        </div>
        <div className={cn('profile-following-section')}>
          <div>
            <span>팔로워</span>100
          </div>
          <div>
            <span>팔로잉</span>100
          </div>
        </div>
      </div>
      <div className={cn('profile-introduce-section')}>
        {member ? member.introduce : '소개가 없습니다.'}
      </div>

      {member ? (
        <div
          onClick={() => setIsModalOpen((prev) => !prev)}
          className={cn('profile-setting-button')}
        >
          <Icon.SettingIcon width="18" height="18" />
        </div>
      ) : (
        <div className={cn('profile-setting-button')}>
          <button
            type="button"
            onClick={() => {
              console.log('인증모달띄우기');
            }}
          >
            인증하기
          </button>
        </div>
      )}
    </div>
  );
}
