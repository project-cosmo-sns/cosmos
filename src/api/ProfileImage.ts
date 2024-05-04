import fetchData from './fetchData';

type ProfileData = {
  profileImageUrl: string;
};

export default async function getProfileImage() {
  const res = await fetchData<ProfileData>({
    param: '/profile/mine',
  });
  return res.profileImageUrl;
}
