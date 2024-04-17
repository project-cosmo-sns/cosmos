import styles from './ProfileHeader.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import DefaultButton from '../Common/Buttons/DefaultButton';

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
          <div> {/* {'회원임?' ? '최유정' : '게스트'} */}</div>
          최유정
          <div className={cn('gen-badge')}>
            {/* {'회원임?' ? '3기' : '대기중'} */}
            3기
          </div>
        </div>
        <div className={cn('profile-following-section')}>
          <div>
            <span>팔로워</span>팔로워 수
          </div>
          <div>
            <span>팔로잉</span>팔로잉 수
          </div>
        </div>
        <div className={cn('profile-intruduce-section')}>
          {/* {'데이터있음?' ? '나는 짱정이다' : '소개가 없습니다.'} */}
          소개가 없습니다.
        </div>
      </div>
      <div className={cn('profile-setting-button')}>
        {/* {'회원임?' ? (
          <Link href="/설정모달띄우기">
            <Image
              src="/icon/setting.svg"
              width={18}
              height={18}
              alt="설정 아이콘"
            />
          </Link>
        ) : (
          <DefaultButton
            onClick={() => {
              console.log('클릭햇당인증하기');
            }}
            size="small"
            color="white-01"
          >
            인증하기
          </DefaultButton>
        )} */}
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
