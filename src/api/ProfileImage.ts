import fetchData from './fetchData';

type ProfileData = {
  profileImageUrl: string;
  status: number;
};

export default async function getProfileImage() {
  const res = await fetchData<ProfileData>({
    param: '/member/profile-image-url',
  });
  return res.profileImageUrl;
}
