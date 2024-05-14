import fetchData from './fetchData';
import { useQuery } from '@tanstack/react-query';

type ProfileData = {
  profileImageUrl: string;
  isLogin: boolean;
};

export function useGetProfileImage() {
  return useQuery({
    queryKey: ['profileImage'],
    queryFn: () =>
      fetchData<ProfileData>({
        param: '/member/summary',
      }),
  });
}

export async function memberLogout() {
  const res = await fetchData({
    param: '/member/logout',
    method: 'post',
  });
  return res;
}
