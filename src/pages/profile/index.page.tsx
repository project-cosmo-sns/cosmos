import ProfileHeader from '@/components/Profile/ProfileHeader';
import Home from '../index.page';

export default function ProfilePage() {
  return (
    <>
      <ProfileHeader />
      {/* 임시로 Home을 넣어둠
      내가 작성한 글만 모아보기, 필터 수정은 따로 해야할듯 */}
      <Home />{' '}
    </>
  );
}
