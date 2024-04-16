import Image from 'next/image';

export default function ProfileHeader() {
  return (
    <div>
      <div>
        <Image
          src="/icon/profile.svg"
          width={86}
          height={86}
          alt="프로필 아이콘"
        />
      </div>
      <div>
        <div>
          <div>이름</div>
          <div>뱃지</div>
        </div>
        <div>
          <div>팔로워 팔로워 수</div>
          <div>팔로잉 팔로잉 수</div>
        </div>
        <div>소개</div>
      </div>
      <div>설정 버튼</div>
    </div>
  );
}
