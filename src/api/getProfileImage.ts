import axios from '@/api/axios';

export default async function getProfileImage() {
  const res = await axios.get('/profile/mine');
  const profileimage = res.data.profileImageUrl;
  return profileimage;
}
