import fetchData from './fetchData';

type ProfileData = {
  profileImageUrl: string;
  status: number;
};

export default async function getProfileImage() {
  const res = await fetchData<ProfileData>({
    param: '/member/profile-image-url',
  });
  if (res.status === 401) {
    console.log('로그인이 필요합니다');
  }
  return res.profileImageUrl;
}
