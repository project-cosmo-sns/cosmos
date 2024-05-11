import fetchData from './fetchData';

type ProfileData = {
  profileImageUrl: string;
  status: number;
};

// export function getProfileImage() {
//   return useQuery({
//     queryKey: ['profileImage'],
//     queryFn: () =>
//       fetchData<ProfileData>({
//         param: '/member/profile-image-url',
//       }),
//   });
// }

export async function getProfileImage() {
  const res = await fetchData<ProfileData>({
    param: '/member/summary',
  });
  return res;
}

export async function memberLogout() {
  const res = await fetchData({
    param: '/member/logout',
    method: 'post',
  });
  return res;
}
